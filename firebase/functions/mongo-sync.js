// Sync supported devices list with MongoDB

const MONGO_PWD = require("./env").MONGO_PWD;
const admin = require('firebase-admin');
const MongoClient = require('mongodb').MongoClient;

if (!admin.apps.length) {
	const serviceAccount = require("./firebase-adminsdk.json");

	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	});
}

const db = admin.firestore();

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

exports.mongoSync = async function() {
// async function mongoSync() {

	/**********************************************************************/
	// Get devices from firestore																					//
	/**********************************************************************/

	const allRouters = [];
	let allRoutersIndex = [];

	await db.collection("all-firmware-routers").get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			allRouters.push(doc.data());
		});
	});

	await db.collection("indices").doc("all-routers-index").get()
	.then((doc) => {
		allRoutersIndex = doc.data().fullNameIndex;
	});

	/**********************************************************************/
	// Upload devices to mongoDB																					//
	/**********************************************************************/
	try {
		const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		await client.connect();

		const mdb = client.db("freetherouter");
		const bulkOp = mdb.collection("all-firmware-devices").initializeUnorderedBulkOp();

		let arrLength = allRouters.length;
		for (let i = 0; i < arrLength; i++) {
			bulkOp.find({fullName: allRouters[i].fullName}).upsert().updateOne({ $set: allRouters[i] });
		}

		await bulkOp.execute();

		await mdb.collection("indices").updateOne({ name: "all-devices-index"}, { $set: {fullNameIndex: allRoutersIndex} }, {upsert: true});

		console.log('Sync to MongoDB Success.');
		client.close();
		
	} catch (error) {
		console.log(error);
	}
};

// mongoSync();
