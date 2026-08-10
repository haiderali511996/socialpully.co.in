# Deploying to cPanel (hunainimpex.com)

Target setup:

| Piece | Where it runs | How |
| --- | --- | --- |
| Next.js frontend | cPanel subdomain of `hunainimpex.com` | Node.js app under Phusion Passenger |
| Django API | Railway (unchanged) | Already deployed |

The browser talks to the Django API **directly** from the client. cPanel only
ever serves the frontend, so the two can be deployed and restarted
independently.

Throughout this document, replace:

- `USER` — your cPanel username
- `socialpully.hunainimpex.com` — the subdomain you actually create

---

## 0. Check your host supports this first

Open cPanel and look for **Software → Setup Node.js App**.

- **Not there?** Your hosting plan does not have CloudLinux Node Selector, and
  a Next.js server cannot run. Ask your host to enable it, or switch the
  frontend to a static export (every page in this app prerenders, so that path
  is available — ask and I'll convert it).
- **There?** Check the Node.js version dropdown offers **18.17 or newer**.
  Next.js 14.2 will not boot on anything older.

Two shared-hosting limits worth checking before you start:

- **Inode quota.** `node_modules` is roughly 40,000 files. If your plan caps
  inodes at 250k and you are already close, the install will fail. Check
  cPanel's stats sidebar for "File Usage".
- **Memory.** `next build` typically needs ~1 GB. If your LVE limit is lower,
  the build gets killed — see the workaround in step 5.

---

## 1. Create the subdomain

cPanel → **Domains → Create A New Domain**

- Domain: `socialpully.hunainimpex.com`
- Uncheck "Share document root" so it gets its own directory
- Document root: accept the default (`/home/USER/socialpully.hunainimpex.com`)

You will **not** put application code in this document root. Passenger serves
the app from a separate directory; cPanel wires the document root to it for you
in step 4. Keeping source out of the document root is what stops anyone from
fetching your `.env.production` over HTTP.

---

## 2. Issue the SSL certificate

cPanel → **Security → SSL/TLS Status** → tick the new subdomain → **Run AutoSSL**.

Do this *before* going live. The site calls the Railway API over HTTPS; if the
frontend is served over plain HTTP, browsers block those calls as mixed content
and every download silently fails.

Wait until the subdomain shows a green padlock before continuing.

---

## 3. Get the code onto the server

**Option A — cPanel Git (recommended, makes updates a one-liner)**

cPanel → **Files → Git™ Version Control** → Create:

- Clone URL: your repo's HTTPS URL
- Repository path: `/home/USER/repos/socialpully`

**Option B — upload**

Zip the repo locally, upload via File Manager to `/home/USER/repos/socialpully`,
extract. Do **not** upload `node_modules` or `.next` this way; they are built on
the server in step 5.

Either way, the frontend application root is:

```
/home/USER/repos/socialpully/frontend/social-flow
```

---

## 4. Create the Node.js application

cPanel → **Software → Setup Node.js App** → **Create Application**

| Field | Value |
| --- | --- |
| Node.js version | 20.x (or 18.17+) |
| Application mode | Production |
| Application root | `repos/socialpully/frontend/social-flow` |
| Application URL | `socialpully.hunainimpex.com` |
| Application startup file | `server.js` |

`server.js` is committed in the repo. Passenger does not run `next start`; it
boots that file, which starts Next.js on the port Passenger assigns.

Click **Create**. At the top of the page cPanel now shows a command like:

```
source /home/USER/nodevenv/repos/socialpully/frontend/social-flow/20/bin/activate && cd /home/USER/repos/socialpully/frontend/social-flow
```

**Copy it — you need it in the next step.** The exact path varies by account.

---

## 5. Configure environment, install, build

Open cPanel → **Terminal** (or SSH in), then paste the `source ...` command from
step 4.

### 5a. Create `.env.production`

```bash
cat > .env.production <<'EOF'
NEXT_PUBLIC_SITE_URL=https://socialpully.hunainimpex.com
NEXT_PUBLIC_API_BASE=https://socialpullybackend-production.up.railway.app
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
EOF
```

> **Why a file and not cPanel's "Environment variables" UI?**
> Every `NEXT_PUBLIC_*` value is compiled into the JavaScript bundle at **build**
> time. Variables set in the cPanel UI are injected when Passenger *starts* the
> app — too late. Next.js reads `.env.production` during `next build`, so the
> file is the reliable place. It is gitignored, so it never leaves the server.

### 5b. Install and build

```bash
npm ci
npm run build
```

`npm ci` needs `package-lock.json`, which is committed. The build takes a few
minutes and prints a route table when it succeeds.

> **If the build is killed** (exit code 137, "Killed", or it dies with no
> message) you hit the memory limit. Build on your own machine instead:
> ```bash
> NEXT_PUBLIC_SITE_URL=https://socialpully.hunainimpex.com \
> NEXT_PUBLIC_API_BASE=https://socialpullybackend-production.up.railway.app \
> npm run build
> ```
> then upload the resulting `.next/` directory into the application root on the
> server. You still need `npm ci` to have run on the server for `node_modules`.

---

## 6. Start it

Back in **Setup Node.js App**, click **Restart** on the application.

From the terminal you can do the same with:

```bash
mkdir -p tmp && touch tmp/restart.txt
```

Passenger picks up `tmp/restart.txt` on the next request and reloads.

Visit `https://socialpully.hunainimpex.com`. You should get the homepage.

---

## 7. Point the Django API at the new origin

The backend stays on Railway; it just needs to trust the new frontend origin.
In the Railway dashboard → your service → **Variables**:

| Variable | Value |
| --- | --- |
| `SECRET_KEY` | a fresh random key (see below) |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `socialpullybackend-production.up.railway.app` |
| `CORS_ALLOWED_ORIGINS` | `https://socialpully.hunainimpex.com` |
| `CSRF_TRUSTED_ORIGINS` | `https://socialpullybackend-production.up.railway.app` |
| `DATABASE_URL` | provided by the Railway Postgres plugin |

Generate the secret key with:

```bash
python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

> **Order matters.** The moment `CORS_ALLOWED_ORIGINS` is set, *only* the listed
> origins may call the API from a browser. Set it after the subdomain is live,
> or list every origin you still use (comma separated) so you don't lock out a
> site that is currently working.

Redeploy the Railway service so the variables take effect.

---

## 8. Verify

```bash
# Frontend serves and canonicals point at the subdomain
curl -s https://socialpully.hunainimpex.com | grep canonical

# Sitemap and robots carry the new host
curl -s https://socialpully.hunainimpex.com/sitemap.xml | head -20
curl -s https://socialpully.hunainimpex.com/robots.txt

# Redirects work (expect 308)
curl -sI https://socialpully.hunainimpex.com/ig | head -3

# Backend reachable and CORS allows the subdomain
curl -s https://socialpullybackend-production.up.railway.app/api/health/
```

Then open the site in a browser, paste a video URL, and watch the Network tab:
the request to `/api/info/` must return 200 with no CORS error in the console.

Finally, in Google Search Console add `socialpully.hunainimpex.com` as a
property and submit `sitemap.xml`.

---

## 9. Deploying updates

```bash
source /home/USER/nodevenv/repos/socialpully/frontend/social-flow/20/bin/activate \
  && cd /home/USER/repos/socialpully/frontend/social-flow
git pull
npm ci
npm run build
touch tmp/restart.txt
```

Rebuild is required for **any** change, including changing a `NEXT_PUBLIC_*`
value — restarting alone will not pick it up.

---

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| 503, or Passenger's "incident" page | App failed to boot | Read `stderr.log` in the application root, and cPanel → Metrics → Errors |
| `Error: Cannot find module 'next'` | `npm ci` ran outside the Node virtualenv | Re-run the `source ...` command from step 4 first |
| `Could not find a production build` | `.next` missing | Run `npm run build` in the application root |
| Build exits 137 / "Killed" | Memory limit | Build locally, upload `.next` (step 5b) |
| Pages load but no styling | Build ran before `npm ci` finished, or partial upload | `rm -rf .next && npm run build`, restart |
| CORS error in browser console | `CORS_ALLOWED_ORIGINS` doesn't match | Must be the exact origin including `https://`, no trailing slash |
| Downloads fail, console shows mixed content | Subdomain not on HTTPS | Run AutoSSL (step 2) |
| Canonical tags show the wrong domain | `NEXT_PUBLIC_SITE_URL` unset at build time | Fix `.env.production`, then **rebuild** |
| First request after idle is slow | Passenger stops idle apps | Normal on shared hosting; a cron hitting the site every few minutes keeps it warm |

---

## Appendix: if you later move Django to cPanel too

It is possible via **Setup Python App** (Passenger + a `passenger_wsgi.py`), but
be aware of what breaks on shared hosting:

- **No ffmpeg.** The app already degrades gracefully, but merged high-quality
  YouTube downloads stop working — you get pre-merged formats only.
- **Request timeouts.** Shared hosts usually cap requests near 60–120s. This app
  asks for 300s, and large downloads will be cut off.
- **Disk quota.** `DownloadVideoView` writes every video to `media/downloads/`
  and nothing cleans it up. It will eat your quota.
- **IP reputation.** TikTok and Instagram block many shared-hosting IP ranges
  outright. (Testing this repo from a datacenter IP returns
  "Your IP address is blocked from accessing this post".)
- **Terms of service.** Most shared-hosting AUPs prohibit video-downloader
  services and the bandwidth they generate. Check yours before you migrate.

Railway is the better home for this workload. If you still want to move it, say
so and I'll add the `passenger_wsgi.py` and the matching steps.
