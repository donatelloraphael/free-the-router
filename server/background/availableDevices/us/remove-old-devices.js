const COUNTRY = "us";

const MONGO_PWD = require("../../env").MONGO_PWD;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function clearOldDevices() {

	let newIndex = [], oldIndex = [];

	await client.connect();
	let mdb = client.db("freetherouter");

	await mdb.collection("indices").findOne({ name: `${COUNTRY}-all-devices-index` })
	.then(doc => {
		if (doc) {
			newIndex = doc.fullNameIndex;
		}
	}).catch(error => console.log(error));

	await mdb.collection("indices").findOne({ name: `${COUNTRY}-old-index` })
	.then(doc => {
		if (doc) {
			oldIndex = doc.fullNameIndex;
		}
	}).catch(error => console.log(error));

	try {
		for (let i = 0; i < oldIndex.length; i++) {
			if (!newIndex.includes(oldIndex[i])) {
				await mdb.collection(`${COUNTRY}-all-devices`).deleteMany({ id: oldIndex[i] })
				.then(() => console.log("Deleted: ", oldIndex[i]));

				await mdb.collection(`${COUNTRY}-device-details`).updateMany({ id: oldIndex[i] }, { $set: { price: "Not Available" } })
				.then(() => console.log("Price cleared: ", oldIndex[i]));
			}
		}
	} catch (error) {
		console.log(error);
	}

	client.close();

}

clearOldDevices();