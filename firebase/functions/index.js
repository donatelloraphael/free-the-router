// Firebase functions

const functions = require('firebase-functions');

const tomatobyshibbyModule = require("./firmwareRouters/tomatobyshibby");
const advancedtomatoModule = require("./firmwareRouters/advancedtomato");
const asuswrtMerlinModule = require("./firmwareRouters/asuswrt-merlin");
const freshtomatoModule = require("./firmwareRouters/freshtomato");
const gargoyleModule = require("./firmwareRouters/gargoyle");
const ddwrtModule = require("./firmwareRouters/ddwrt");
const openwrtModule = require("./firmwareRouters/openwrt");

const mongoSyncModule = require("./mongo-sync");

exports.mongoSync = functions.pubsub.schedule("30 14 * * *")
                                      .region("europe-west6")                              
                                      .timeZone("Asia/Kolkata")
                                      .onRun(context => {
                                        return mongoSyncModule.mongoSync();
                                      });

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