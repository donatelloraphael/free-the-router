const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://free-the-router-13e19.firebaseio.com"
	});
}

const db = admin.firestore();

const allSitesRef = db.collection("IN").doc("all-sites");
const indiaIndices = db.collection("IN").doc("meta").collection("indices");

async function clearOldDevices() {

	let newIndex = [], oldIndex = [];

	await indiaIndices.doc("all-devices").get()
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
			await allSitesRef.collection("all-devices").doc(oldIndex[i]).delete()
			.then(() => console.log('Deleted: ', oldIndex[i]))
			.catch(error => console.log(error));

			await allSitesRef.collection("device-details").doc(oldIndex[i].replace(/\ /gm, "-")).update({
				price: "Not Available"
			}, {merge: true})
			.then(() => console.log('Price cleared: ', oldIndex[i]))
			.catch(error => console.log(error));
		}
	}

}

clearOldDevices();