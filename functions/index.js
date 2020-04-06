const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')

//////////////////OTHER FUNCTIONS//////////////////////////
// const {PubSub} = require('@google-cloud/pubsub');

const createTomatobyshibbyModule = require("./firmwareRouters/tomatobyshibby");
const createAdvancedtomatoModule = require("./firmwareRouters/advancedtomato");
const checkAsuswrtMerlinModule = require("./firmwareRouters/asuswrt-merlin");
const checkFreshtomatoModule = require("./firmwareRouters/freshtomato");
const checkGargoyleModule = require("./firmwareRouters/gargoyle");
const checkDdwrtModule = require("./firmwareRouters/ddwrt");
const checkOpenwrtModule = require("./firmwareRouters/openwrt");

// const pubSubClient = new PubSub();

//////////////////SERVER SIDE RENDER////////////////////////

const app = express()

const config = {
  dev: false
}

const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.render(req, res)
}

app.get('*', handleRequest)
app.use(handleRequest)
exports.nuxtssr = functions.https.onRequest(app)

///////////////////////////OTHER FUNCTIONS////////////////////////////////////

exports.createTomatobyshibby = functions.pubsub.schedule('0 14 * * *')
                                      .timeZone('Asia/Kolkata')
                                      .onRun((context) => {
                                      return createTomatobyshibbyModule.createTomatobyshibbyList();
                                    });

exports.createAdvancedtomato = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
                                  return createAdvancedtomatoModule.createAdvancedtomatoList();
                                });

exports.checkAsuswrtMerlin = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
                                return checkAsuswrtMerlinModule.checkMerlin();
                              });

exports.checkFreshtomato = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
                              return checkFreshtomatoModule.checkFreshTomato();
                            });

exports.checkGargoyle = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
                              return checkGargoyleModule.checkGargoyleList();
                          });

exports.checkDdwrt = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
                          return checkDdwrtModule.checkDdwrt();
                        });

exports.checkOpenwrt = functions.pubsub.topic("firebase-schedule-createTomatobyshibby-us-central1").onPublish((message) => {
                          return checkOpenwrtModule.checkOpenwrt();
                        });