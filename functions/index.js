const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const helmet = require("helmet");

//////////////////OTHER FUNCTIONS//////////////////////////

const tomatobyshibbyModule = require("./firmwareRouters/tomatobyshibby");
const advancedtomatoModule = require("./firmwareRouters/advancedtomato");
const asuswrtMerlinModule = require("./firmwareRouters/asuswrt-merlin");
const freshtomatoModule = require("./firmwareRouters/freshtomato");
const gargoyleModule = require("./firmwareRouters/gargoyle");
const ddwrtModule = require("./firmwareRouters/ddwrt");
const openwrtModule = require("./firmwareRouters/openwrt");

const cronPingModule = require("./cron-ping.js");

//////////////////SERVER SIDE RENDER////////////////////////

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
      policy: 'origin'
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
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*.googletagmanager.com"],
        imgSrc: ["'self'", "*.media-amazon.com", "*.ssl-images-amazon.com", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'", "*.fontawesome.com"],
        fontSrc: ["'self'", "*.fontawesome.com"],
        connectSrc: ["'self'", "*.google-analytics.com", "*.googleapis.com"]
      }
    }
  })
);

const config = {
  dev: false
};

const nuxt = new Nuxt(config);

let isReady = false;
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true;
  })
  .catch(() => {
    process.exit(1);
  });

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise;
  }

  res.set('Cache-Control', 'public, stale-while-revalidate=345600, max-age=172800, s-maxage=172800');
  await nuxt.render(req, res);
}

app.get('*', handleRequest);

app.use(handleRequest);
exports.nuxtssr = functions.runWith({timeoutSeconds: 30, memory: '1GB'}).https.onRequest(app);
              
///////////////////////////OTHER FUNCTIONS////////////////////////////////////

exports.checkAndUpdateTomatobyshibby = functions.pubsub.schedule('0 14 * * *')
                                      .timeZone('Asia/Kolkata')
                                      .onRun((context) => {
                                      return tomatobyshibbyModule.checkAndUpdateTomatobyshibby();
                                    });

exports.checkAdvancedtomato = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                                  return advancedtomatoModule.checkAdvancedtomato();
                                });

exports.checkAsuswrtMerlin = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                                return asuswrtMerlinModule.checkAsusMerlin();
                              });

exports.checkAndUpdateFreshtomato = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                              return freshtomatoModule.checkAndUpdateFreshtomato();
                            });

exports.checkGargoyle = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                              return gargoyleModule.checkGargoyle();
                          });

exports.checkAndUpdateDdwrt = functions.runWith({timeoutSeconds: 120, memory: '512MB'}).pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                          return ddwrtModule.checkAndUpdateDdwrt();
                        });

exports.checkAndUpdateOpenwrt = functions.runWith({timeoutSeconds: 540, memory: '2GB'}).pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                          return openwrtModule.checkAndUpdateOpenwrt();
                        });

exports.pingSite = functions.runWith({timeoutSeconds: 30, memory: '128MB'}).pubsub.schedule("every 5 minutes")
                    .timeZone('Asia/Kolkata')
                    .onRun((context) => {
                      return cronPingModule.pingSite();
                    });