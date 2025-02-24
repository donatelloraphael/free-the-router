const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const helmet = require("helmet");
const cors = require("cors");

const PROTOCOL = require('../app/env').PROTOCOL;
const HOST = require('../app/env').HOST;

const app = express();

const corsOptions = {
    origin: `http://${HOST}`,
    methods: "GET,HEAD",
    preflightContinue: false,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(
  helmet({
    frameguard: {
      action: 'sameorigin'
    },
    expectCt: {
      maxAge: 86400
    },
    referrerPolicy: {
      policy: 'origin-when-cross-origin'
    },
    strictTransportSecurity: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    },
    dnsPrefetchControl: {
      allow: true
    },
    permittedCrossDomainPolicies: {
      permittedPolicies: "by-content-type"
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "data:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*.googletagmanager.com", "*.cloudflareinsights.com", "*.google-analytics.com", "*.cloudflare.com"],
        imgSrc: ["'self'", "*.media-amazon.com", "*.ssl-images-amazon.com", "*.google-analytics.com", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'", "*.googleapis.com"],
        fontSrc: ["'self'", "*.gstatic.com"],
        connectSrc: ["'self'", "*.google-analytics.com", "*.googleapis.com","*.freetherouter.com", "freetherouter.com", `0.0.0.0`, "*.cloudflareinsights.com"]
      }
    }
  })
);


// Import and Set Nuxt.js options
const config = require('../../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  async function handleRequest(req, res) {
    res.set('X-XSS-Protection', '1');
    res.set('Cache-Control', 'public, stale-while-revalidate=345600, max-age=172800, s-maxage=172800');
    await nuxt.render(req, res);
  }
  // Give nuxt middleware to express
  app.use(handleRequest);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
