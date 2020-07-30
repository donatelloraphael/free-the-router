const COUNTRY = "CA";

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../../functions/firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const allSitesRef = db.collection(COUNTRY).doc("all-sites");
const indicesRef = db.collection(COUNTRY).doc("meta").collection("indices");

async function clearOldDevices() {

	let newIndex = [], oldIndex = [];

	await indicesRef.doc("all-devices").get()
	.then(doc => {
		if (doc.data()) {
			newIndex = doc.data().fullNameIndex;
		}
	});

	await indicesRef.doc("old-index").get()
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