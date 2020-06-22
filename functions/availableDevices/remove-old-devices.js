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

async function clearOldDevices() {

	let newIndex = [], oldIndex = [];

	await indiaIndices.doc("amazon-all-devices-index").get()
	.then(doc => {
		if (doc.data()) {
			newIndex = doc.data().fullNameIndex;
		}
	});

	await indiaIndices.doc("old-index").get()
	.then(doc => {
		if (doc.data()) {
			oldIndex = doc.data().fullNameIndex;
		}
	});

	for (let i = 0; i < oldIndex.length; i++) {
		if (!newIndex.includes(oldIndex[i])) {
			await amazonRef.collection("all-devices").doc(oldIndex[i]).delete()
			.then(() => console.log('Deleted: ', oldIndex[i]))
			.catch(error => console.log(error));
		}
	}

}

clearOldDevices();