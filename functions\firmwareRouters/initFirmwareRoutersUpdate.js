const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();

exports.updateAllFirmwareRouters = function () {
	const dataBuffer = Buffer.from("update");
	pubSubClient.topic("create-tomatobyshibby").publish(dataBuffer);
  console.log(`Message published. This will be run every 24 hours at 2PM.`);
  return true;
};