# Deploying to cPanel (hunainimpex.com)

## Domain plan

| Host | Serves | cPanel app type |
| --- | --- | --- |
| `hunainimpex.com` (apex, main domain) | Next.js frontend | Setup **Node.js** App |
| `api.hunainimpex.com` | Django API | Setup **Python** App, or a CNAME to Railway |

These are the committed defaults — `lib/site.js` falls back to
`https://hunainimpex.com` and the API client falls back to
`https://api.hunainimpex.com`, so a build with no environment variables set
already produces the right URLs. Setting them explicitly in `.env.production`
is still recommended, so a future domain change is one edit.

### Read this before you start

**Putting the frontend on the apex replaces whatever is currently served at
`hunainimpex.com`.** When you point a cPanel Node.js app at the main domain,
cPanel writes a Passenger handoff into `public_html/.htaccess` and Apache stops
serving the files that are there. Concretely:

- Any existing import/export website at `hunainimpex.com` disappears from the
  web the moment the Node app starts.
- Any pages of it that Google has indexed start returning the downloader's 404.
- Email, databases and subdomains are unaffected — this is only about what the
  web root serves.

So before step 1:

```bash
# from cPanel Terminal — keep a copy of whatever is there now
tar czf ~/public_html-backup-$(date +%F).tar.gz -C /home/USER public_html
```

If `public_html` currently holds a real business site you still want, stop and
put the downloader on a subdomain instead — everything below works unchanged
if you swap `hunainimpex.com` for `socialpully.hunainimpex.com`.

### www vs apex

Canonical tags will say `https://hunainimpex.com`, so `www.hunainimpex.com`
must redirect there rather than serve a duplicate copy. Step 1 covers it.

Throughout this document, replace `USER` with your cPanel username.

---

# Part A — Frontend (Node.js app)

The browser talks to the Django API **directly** from the client, so the two
apps deploy and restart independently.

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

## 1. Prepare the main domain

The apex already exists, so there is nothing to create. Two things to do.

**a. Back up the current web root** — see the warning above:

```bash
tar czf ~/public_html-backup-$(date +%F).tar.gz -C /home/USER public_html
```

**b. Redirect www to the apex.** Edit `/home/USER/public_html/.htaccess` and put
this at the very top, *above* any block cPanel has written:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.hunainimpex\.com$ [NC]
RewriteRule ^(.*)$ https://hunainimpex.com/$1 [R=301,L]
```

Doing this in Apache rather than Next.js middleware means the redirect costs
nothing — it never reaches Node.

> Application code does **not** go in `public_html`. Passenger serves it from a
> separate directory that cPanel wires up in step 4. Keeping source out of the
> web root is what stops anyone fetching your `.env.production` over HTTP.

---

## 2. Check the SSL certificate

cPanel → **Security → SSL/TLS Status**. The main domain almost certainly has a
certificate already; confirm it covers **both** `hunainimpex.com` and
`www.hunainimpex.com`, and run **AutoSSL** if either is missing.

This matters before you go live: the site calls the API over HTTPS, and if the
frontend is served over plain HTTP, browsers block those calls as mixed content
and every download fails silently.

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
| Application URL | `hunainimpex.com` |
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
NEXT_PUBLIC_SITE_URL=https://hunainimpex.com
NEXT_PUBLIC_API_BASE=https://api.hunainimpex.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
EOF
```

> `NEXT_PUBLIC_API_BASE` must match whatever Part B leaves you with. Both
> routes in Part B end up on `https://api.hunainimpex.com`, so this value is
> the same either way. Changing it later means editing this file and
> **rebuilding**.

> **Why a file and not cPanel's "Environment variables" UI?**
> Every `NEXT_PUBLIC_*` value is compiled into the JavaScript bundle at **build**
> time. Variables set in the cPanel UI are injected when Passenger *starts* the
> app — too late. Next.js reads `.env.production` during `next build`, so the
> file is the reliable place. It is gitignored, so it never leaves the server.

### 5b. Install and build

```bash
npm ci --include=dev
npm run build
```

`npm ci` needs `package-lock.json`, which is committed. The build takes a few
minutes and prints a route table when it succeeds.

> **`--include=dev` is required, not optional.** cPanel's "Production"
> application mode sets `NODE_ENV=production`, and `npm ci` respects that by
> skipping everything in `devDependencies` — which includes `typescript`,
> `tailwindcss`, `postcss`, and `eslint-config-next`. Without `typescript`
> installed, Next.js can't read the `@/*` path alias in `tsconfig.json`, and
> the build fails with `Module not found: Can't resolve '@/lib/...'` for
> every import that uses it. None of these packages are needed once the app
> is running — only for this build step — so there's no downside to
> installing them regardless of `NODE_ENV`.

> **If the build is killed** (exit code 137, "Killed", or it dies with no
> message) you hit the memory limit. Build on your own machine instead:
> ```bash
> NEXT_PUBLIC_SITE_URL=https://hunainimpex.com \
> NEXT_PUBLIC_API_BASE=https://api.hunainimpex.com \
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

Visit `https://hunainimpex.com`. You should get the homepage.

---

## 7. Let the API accept the new origin

Wherever the API ends up living (Part B), it has to trust the frontend's
origin. If you are keeping it on Railway, set these in the Railway dashboard →
your service → **Variables**:

| Variable | Value |
| --- | --- |
| `SECRET_KEY` | a fresh random key (see below) |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `api.hunainimpex.com` |
| `CORS_ALLOWED_ORIGINS` | `https://hunainimpex.com` |
| `CSRF_TRUSTED_ORIGINS` | `https://api.hunainimpex.com` |
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
curl -s https://hunainimpex.com | grep canonical

# Sitemap and robots carry the new host
curl -s https://hunainimpex.com/sitemap.xml | head -20
curl -s https://hunainimpex.com/robots.txt

# Redirects work (expect 308)
curl -sI https://hunainimpex.com/ig | head -3

# Backend reachable
curl -s https://api.hunainimpex.com/api/health/
```

Then open the site in a browser, paste a video URL, and watch the Network tab:
the request to `/api/info/` must return 200 with no CORS error in the console.

Finally, in Google Search Console add `hunainimpex.com` as a
property and submit `sitemap.xml`.

---

## 9. Deploying updates

```bash
source /home/USER/nodevenv/repos/socialpully/frontend/social-flow/20/bin/activate \
  && cd /home/USER/repos/socialpully/frontend/social-flow
git pull
npm ci --include=dev
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
| `Module not found: Can't resolve '@/lib/...'` | `NODE_ENV=production` (cPanel's Production app mode) made `npm ci` skip `devDependencies`, including `typescript`, which Next needs to read the `@/*` alias | `rm -rf node_modules .next && npm ci --include=dev && npm run build` |
| `spawn .../bin/node EAGAIN` during "Collecting page data" | CloudLinux's per-account process (`nproc`/LVE) cap — Next's default build workers are forked as separate OS processes and exceed it | Already handled: `next.config.js` sets `experimental.cpus: 1` and `workerThreads: true`, which uses in-process threads instead of forked processes. Pull the latest commit if you hit this on an older checkout. |
| `TypeError: Failed to parse URL from http://localhost:undefined?...&method=revalidateTag` printed during "Generating static pages" | A known cosmetic Next.js 14.2.x quirk triggered by having a Route Handler (`app/api/download/route.js`) — an internal cache-invalidation call fires during static generation before it has a real port to call | Harmless — ignore it. The build still finishes and produces the full route table below it. |
| Pages load but no styling | Build ran before `npm ci` finished, or partial upload | `rm -rf .next && npm run build`, restart |
| CORS error in browser console | `CORS_ALLOWED_ORIGINS` doesn't match | Must be the exact origin including `https://`, no trailing slash |
| Downloads fail, console shows mixed content | Subdomain not on HTTPS | Run AutoSSL (step 2) |
| Canonical tags show the wrong domain | `NEXT_PUBLIC_SITE_URL` unset at build time | Fix `.env.production`, then **rebuild** |
| The old business site is gone from `hunainimpex.com` | Expected — the Node app now owns the apex | Restore from the `public_html` backup and move the app to a subdomain |
| `api.hunainimpex.com` serves the frontend, or 500s | Its document root sits inside `public_html`, inheriting the apex's Passenger config | Recreate it with a document root outside `public_html` — see B2.1 |
| `www.hunainimpex.com` serves a duplicate of the site | www redirect missing | Add the rewrite from step 1b, above cPanel's block in `public_html/.htaccess` |
| First request after idle is slow | Passenger stops idle apps | Normal on shared hosting; a cron hitting the site every few minutes keeps it warm |

---

---

# Part B — Backend (Django API)

You have two ways to put the API on `api.hunainimpex.com`. They
differ in where the work actually runs.

## B1 — Point the subdomain at Railway (recommended)

Keep Django running on Railway and give it your branded hostname. You get the
domain you want without inheriting shared hosting's limits.

1. Railway → your service → **Settings → Networking → Custom Domain** → add
   `api.hunainimpex.com`. Railway shows a CNAME target.
2. cPanel → **Domains → Zone Editor** for `hunainimpex.com` → **Add Record**:
   - Type: `CNAME`
   - Name: `api`
   - Record: the target Railway gave you
3. Do **not** create a cPanel subdomain for this name — a CNAME and a local
   docroot for the same host conflict, and cPanel will answer instead of Railway.
4. Wait for DNS to propagate, then set on Railway:

   | Variable | Value |
   | --- | --- |
   | `ALLOWED_HOSTS` | `api.hunainimpex.com` |
   | `CSRF_TRUSTED_ORIGINS` | `https://api.hunainimpex.com` |
   | `CORS_ALLOWED_ORIGINS` | `https://hunainimpex.com` |

Railway issues the TLS certificate itself. Nothing else changes.

## B2 — Run Django on cPanel (Setup Python App)

Everything needed is committed: `passenger_wsgi.py` is the entry point, and the
MySQL shim in `video_downloader/__init__.py` handles cPanel's database.

Read [What actually breaks](#what-actually-breaks-on-shared-hosting) at the end
of this part before committing to it.

### B2.1 Create the subdomain and certificate

cPanel → **Domains → Create A New Domain** → `api.hunainimpex.com`.

> **Change the document root away from the default.** cPanel proposes
> `/home/USER/public_html/api`. Do not accept it. Once the frontend owns the
> apex, `public_html/.htaccess` carries `PassengerBaseURI "/"`, and Apache
> applies that to every directory beneath it — including a subdomain rooted
> there. You get two Passenger apps fighting over the same tree, which fails in
> confusing ways.
>
> Set it to `/home/USER/api.hunainimpex.com` instead, outside `public_html`.

Then run AutoSSL for the new subdomain (frontend step 02).

### B2.2 Create the MySQL database

cPanel gives you MySQL, not PostgreSQL.

cPanel → **Databases → MySQL® Databases**:

1. Create a database, e.g. `USER_socialpully`
2. Create a user with a strong password
3. Add the user to the database with **All Privileges**

cPanel prefixes both names with your username — note the full names.

### B2.3 Create the Python application

cPanel → **Software → Setup Python App** → **Create Application**

| Field | Value |
| --- | --- |
| Python version | 3.12 (anything 3.10+ works; Django 5.2 requires it) |
| Application root | `repos/socialpully/backend/video_downloader` |
| Application URL | `api.hunainimpex.com` |
| Application startup file | `passenger_wsgi.py` |
| Application Entry point | `application` |

> **Clone the repo before you click Create.** cPanel creates the Application
> root directory if it is missing, and a Python app pointed at an empty
> directory fails to boot. Part A step 3 covers the clone; the directory
> `repos/socialpully/backend/video_downloader` must already contain
> `passenger_wsgi.py` and `manage.py`.
>
> Leave the path box next to the **Application URL** dropdown empty — that
> serves the app at the root of the subdomain. Anything typed there becomes a
> sub-path, so `/api/health/` would move to `/whatever/api/health/`.
>
> **Environment variables** can stay empty here. Step B2.5 writes them to a
> `.env` file that `passenger_wsgi.py` reads, which keeps the database password
> out of the cPanel UI and lets you `chmod 600` it. Using this panel instead
> also works — real environment variables take precedence over the file.

Copy the activation command cPanel prints at the top of the page.

### B2.4 Install dependencies

In cPanel → **Terminal**, paste the activation command, then:

```bash
# swap the PostgreSQL driver for the pure-Python MySQL one:
# shared hosting has no compiler for mysqlclient, and psycopg2 is unused here
sed -i 's/^psycopg2-binary/# psycopg2-binary/' requirements.txt
pip install -r requirements.txt
pip install PyMySQL==1.1.2
```

`video_downloader/__init__.py` registers PyMySQL as MySQLdb automatically, so
Django's MySQL backend works with no further changes.

### B2.5 Configure

```bash
cat > .env <<'EOF'
SECRET_KEY=paste-a-generated-key-here
DEBUG=False
ALLOWED_HOSTS=api.hunainimpex.com
CORS_ALLOWED_ORIGINS=https://hunainimpex.com
CSRF_TRUSTED_ORIGINS=https://api.hunainimpex.com
DATABASE_URL=mysql://USER_dbuser:PASSWORD@localhost:3306/USER_socialpully
EOF
chmod 600 .env
```

Generate the key with:

```bash
python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

`passenger_wsgi.py` reads this file at startup. Real environment variables set
in cPanel's UI take precedence, so you can use either — the file is just less
fiddly. Unlike the frontend, Django reads config at request time, so no rebuild
is involved: changing `.env` needs only a restart.

### B2.6 Migrate and collect static

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

### B2.7 Start and verify

Click **Restart** in Setup Python App, then:

```bash
curl -s https://api.hunainimpex.com/api/health/
```

You should get JSON including `yt_dlp_version`. Note whether
`ffmpeg_installed` is `true` — if it is `false`, see below.

### B2.8 Set up the cleanup cron — do not skip this

`DownloadVideoView` writes every requested video into `media/downloads/` and
nothing removes them. On Railway that disk is ephemeral so it self-corrects; on
cPanel it is your account quota, and it *will* fill up.

A management command is committed for this. cPanel → **Advanced → Cron Jobs**,
every 6 hours:

```
0 */6 * * * /home/USER/virtualenv/repos/socialpully/backend/video_downloader/3.12/bin/python /home/USER/repos/socialpully/backend/video_downloader/manage.py cleanup_downloads --hours 6
```

Use the interpreter path from your app's activation command. Check what it
would remove first:

```bash
python manage.py cleanup_downloads --hours 6 --dry-run
```

It deletes files older than the cutoff and marks the matching database rows as
`expired`, so `/api/file/<id>/` stops pointing at files that are gone.

### What actually breaks on shared hosting

None of these stop the app booting. They shape what it can do.

| Limit | Effect |
| --- | --- |
| **No ffmpeg** | `/api/health/` reports `ffmpeg_installed: false`. Merged high-quality YouTube downloads stop working; you get pre-merged formats only. The app degrades gracefully and says so in its response. Ask your host — some will install it. |
| **Request timeouts** | Shared hosts usually cap requests at 60–120s. The app asks for 300s. Long videos get cut off mid-download. |
| **Memory** | yt-dlp plus Django in one Passenger process is tight under a 1 GB LVE limit. Concurrent downloads are what push it over. |
| **IP reputation** | TikTok and Instagram block many shared-hosting IP ranges. Testing this repo from a datacenter IP returns *"Your IP address is blocked from accessing this post."* This is the failure most likely to make the site look broken while everything is configured correctly. |
| **Terms of service** | Most shared-hosting AUPs prohibit video-downloader services and the bandwidth they generate. Worth reading yours before you migrate — a suspension takes the frontend down with it. |

If you hit the IP-block problem, B1 is the fix: move the API back to Railway
and keep the same hostname via CNAME. Because the frontend only knows
`NEXT_PUBLIC_API_BASE`, switching is a DNS change plus a rebuild.
