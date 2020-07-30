const COUNTRY = "US";

const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../functions/firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const allSitesRef = db.collection(COUNTRY).doc("all-sites");
const indicesRef = db.collection(COUNTRY).doc("meta").collection("indices");

async function createOldIndex() {

	await indicesRef.doc("all-devices").get()
	.then(async doc => {
		if (doc.data()) {
			let index = doc.data().fullNameIndex;

			await indicesRef.doc("old-index").set({
				fullNameIndex: index
			}).then(() => console.log("old-index created"))
			.catch(error => console.log(error));
		}
	}).catch(error => console.log(error));

	await indicesRef.doc("all-devices").delete()
	.then(() => console.log("all-devices index cleared."))
	.catch(error => console.log(error));

}

createOldIndex();