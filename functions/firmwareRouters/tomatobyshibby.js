const functions = require('firebase-functions');

exports.tomatobyshibbyUpdate = functions.pubsub.topic("update-firmware-list").onPublish(() => {

});