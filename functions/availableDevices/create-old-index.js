const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

const amazonRef = db.collection("india").doc("amazon.in");

async function createOldIndex() {

	await amazonRef.collection("indices").doc("amazon-all-devices-index").get()
	.then(async doc => {
		if (doc.data()) {
			let index = doc.data().fullNameIndex;

			await amazonRef.collection("indices").doc("old-index").set({
				fullNameIndex: index
			}).then(() => console.log("old-index created"))
			.catch(error => console.log(error));
		}
	}).catch(error => console.log(error));

	await amazonRef.collection("indices").doc("amazon-all-devices-index").delete()
	.then(() => console.log("amazon-all-devices-index cleared."))
	.catch(error => console.log(error));

}

createOldIndex();