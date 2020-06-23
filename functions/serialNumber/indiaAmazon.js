const admin = require('firebase-admin');

if (!admin.apps.length) {
	const serviceAccount = require("../firebase-adminsdk.json");

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://free-the-router-13e19.firebaseio.com"
	});
}

const db = admin.firestore();

exports.indiaAmazonSerial = async function(data, context) {
	
	return db.runTransaction(async transaction => {

		let category = context.params.category;
		let device = context.params.devices;
		let number = 0;

		const metaRef = db.doc("india/metaData/meta/" + category);
		// const metaData = (await transaction.get(metaRef)).data();
		await transaction.get(metaRef)
		.then(doc => {
			if (doc.data()) {
				number = doc.data().count;
			}
		});

		++number;

		transaction.set(metaRef, {
			count: number
		}, {merge: true});

		const deviceRef = db.doc(`india/amazon.in/${category}/${device}`);

		transaction.set(deviceRef, {
			serialNumber: number,
			serialUpdated: true
		}, {merge: true});

	});

};