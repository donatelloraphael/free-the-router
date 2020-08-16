const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const helmet = require("helmet");

const app = express();

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
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*.googletagmanager.com", "*.cloudflareinsights.com"],
        imgSrc: ["'self'", "*.media-amazon.com", "*.ssl-images-amazon.com", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'", "*.fontawesome.com"],
        fontSrc: ["'self'", "*.fontawesome.com"],
        connectSrc: ["'self'", "*.google-analytics.com", "*.googleapis.com"]
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

  // function getCountry(req, res, next) {
  //   if (firstLoad) {
  //     res.set("country", "IN");
  //   }
  //   console.log("AFTER: ", res.get("country"));
  //   next();
  // } 

  async function handleRequest(req, res) {
  	res.set('X-XSS-Protection', '1');
    res.set('Cache-Control', 'public, stale-while-revalidate=345600, max-age=172800, s-maxage=172800');
    await nuxt.render(req, res);
  }
  // Give nuxt middleware to express
  // app.use(getCountry);
  app.use(handleRequest);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
