const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
//////////////////OTHER FUNCTIONS//////////////////////////

const tomatobyshibbyModule = require("./firmwareRouters/tomatobyshibby");
const advancedtomatoModule = require("./firmwareRouters/advancedtomato");
const asuswrtMerlinModule = require("./firmwareRouters/asuswrt-merlin");
const freshtomatoModule = require("./firmwareRouters/freshtomato");
const gargoyleModule = require("./firmwareRouters/gargoyle");
const ddwrtModule = require("./firmwareRouters/ddwrt");
const openwrtModule = require("./firmwareRouters/openwrt");

////////////////// Add Serial Number ///////////////////////

const indiaAmazonModule = require("./serialNumber/indiaAmazon");

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

exports.checkAndUpdateDdwrt = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                          return ddwrtModule.checkAndUpdateDdwrt();
                        });

exports.checkAndUpdateOpenwrt = functions.pubsub.topic("firebase-schedule-checkAndUpdateTomatobyshibby-us-central1").onPublish((message) => {
                          return openwrtModule.checkAndUpdateOpenwrt();
                        });



/************************* Add Serial Numbers **************************/
/***********************************************************************/

// India

exports.indiaAmazonSerial = functions.firestore.document("india/amazon.in/{category}/{devices}")
                            .onCreate((data, context) => {      
                              return indiaAmazonModule.indiaAmazonSerial(data, context);
                            });