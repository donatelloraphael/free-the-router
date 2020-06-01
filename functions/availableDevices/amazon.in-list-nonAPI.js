const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const indicesRef = db.collection("indices");
const allFirmwareRoutersRef = db.collection("all-firmware-routers");


async function getDevices() {

	let fullNameIndex = [];

	await indicesRef.doc("all-routers-index").get()
	.then(doc => {
		if (doc.data()) {
			fullNameIndex = doc.data().fullNameIndex;
		}
	});

	console.dir(fullNameIndex, {maxArrayLength: null});

}

getDevices();