const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../../firebase-adminsdk.json");
	admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const allSitesRef = db.collection("IN").doc("all-sites");
const indiaIndices = db.collection("IN").doc("meta").collection("indices");

async function createOldIndex() {

	await indiaIndices.doc("all-devices").get()
	.then(async doc => {
		if (doc.data()) {
			let index = doc.data().fullNameIndex;

			await indiaIndices.doc("old-index").set({
				fullNameIndex: index
			}).then(() => console.log("old-index created"))
			.catch(error => console.log(error));
		}
	}).catch(error => console.log(error));

	await indiaIndices.doc("all-devices").delete()
	.then(() => console.log("all-devices index cleared."))
	.catch(error => console.log(error));

}

createOldIndex();