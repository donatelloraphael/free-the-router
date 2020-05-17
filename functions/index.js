const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

//////////////////OTHER FUNCTIONS//////////////////////////
// const {PubSub} = require('@google-cloud/pubsub');

const tomatobyshibbyModule = require("./firmwareRouters/tomatobyshibby");
// const createAdvancedtomatoModule = require("./firmwareRouters/advancedtomato");
const asuswrtMerlinModule = require("./firmwareRouters/asuswrt-merlin");
const freshtomatoModule = require("./firmwareRouters/freshtomato");
// const checkGargoyleModule = require("./firmwareRouters/gargoyle");
// const checkDdwrtModule = require("./firmwareRouters/ddwrt");
// const checkOpenwrtModule = require("./firmwareRouters/openwrt");

// const pubSubClient = new PubSub();

//////////////////SERVER SIDE RENDER////////////////////////

const app = express();

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
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  await nuxt.render(req, res);
}

app.get('*', handleRequest);
app.use(handleRequest);
exports.nuxtssr = functions.https.onRequest(app);

///////////////////////////OTHER FUNCTIONS////////////////////////////////////

exports.checkAndUpdateTomatobyshibby = functions.pubsub.schedule('0 14 * * *')
                                      .timeZone('Asia/Kolkata')
                                      .onRun((context) => {
                                      return tomatobyshibbyModule.checkAndUpdateTomatobyshibby();
                                    });

// exports.createAdvancedtomato = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
//                                   return createAdvancedtomatoModule.createAdvancedtomatoList();
//                                 });

exports.checkAsuswrtMerlin = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                                return asuswrtMerlinModule.checkAsusMerlin();
                              });

exports.checkAndUpdateFreshtomato = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                              return freshtomatoModule.checkAndUpdateFreshtomato();
                            });

// exports.checkGargoyle = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
//                               return checkGargoyleModule.checkGargoyleList();
//                           });

// exports.checkDdwrt = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
//                           return checkDdwrtModule.checkDdwrt();
//                         });

// exports.checkOpenwrt = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
//                           return checkOpenwrtModule.checkOpenwrt();
//                         });