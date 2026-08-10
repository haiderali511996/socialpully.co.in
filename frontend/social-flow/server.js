// Startup file for cPanel's "Setup Node.js App" (Phusion Passenger).
//
// Passenger does not run `next start`; it boots this file and expects the app
// to listen on the port it hands over in process.env.PORT. Point the
// "Application startup file" field at this file.
//
// The build output (.next/) must already exist — run `npm run build` before
// starting or restarting the app.
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start Next.js:', err);
    process.exit(1);
  });
