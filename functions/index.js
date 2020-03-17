const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')

//////////////////OTHER FUNCTIONS//////////////////////////
const {PubSub} = require('@google-cloud/pubsub');

const initFirmwareRoutersUpdateModule = require("./firmwareRouters/initFirmwareRoutersUpdate");

const pubSubClient = new PubSub();

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

exports.updateAllFirmwareRouters = functions.pubsub.schedule('0 14 * * *')
                                    .timeZone('Asia/Kolkata')
                                    .onRun((context) => {
                                    return initFirmwareRoutersUpdateModule.updateAllFirmwareRouters();
                                  });