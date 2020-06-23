const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://free-the-router-13e19.firebaseio.com"
	});
}

const db = admin.firestore();

const amazonRef = db.collection("india").doc("amazon.in");
const indiaIndices = db.collection("india").doc("metaData").collection("indices");
const metaRef = db.collection("india").doc("metaData").collection("meta");

async function createOldIndex() {

	await indiaIndices.doc("amazon-all-devices-index").get()
	.then(async doc => {
		if (doc.data()) {
			let index = doc.data().fullNameIndex;

			await indiaIndices.doc("old-index").set({
				fullNameIndex: index
			}).then(() => console.log("old-index created"))
			.catch(error => console.log(error));
		}
	}).catch(error => console.log(error));

	await indiaIndices.doc("amazon-all-devices-index").delete()
	.then(() => console.log("amazon-all-devices-index cleared."))
	.catch(error => console.log(error));

}

async function clearSerialCount() {

	await metaRef.doc("all-devices").delete();
	await metaRef.doc("routers").delete();
	await metaRef.doc("modems").delete();
	await metaRef.doc("wireless access points").delete();
	await metaRef.doc("repeaters & extenders").delete();

	console.log('Serial Counters cleared.');
}

createOldIndex();
clearSerialCount();