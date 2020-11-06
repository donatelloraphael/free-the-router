const COUNTRY = "gb";

const MONGO_PWD = require("../../env").MONGO_PWD;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function init() {

	await client.connect();
	let mdb = client.db("freetherouter");

	// Delete all-devices-index //
	/****************************/

	await mdb.collection("indices").deleteOne({ name: `${COUNTRY}-all-devices-index` })
	.catch(error => console.log(error));

	console.log("all-devices-index has been deleted.");

	// Clear prices in device-details //
	/**********************************/

	await mdb.collection(`${COUNTRY}-device-details`).updateMany({}, { $set: { amazonPrice: "Not Available" }})
	.catch(error => console.log(error));

	console.log("device-details prices cleared.");

	// Clear all-devices //
	/*********************************/

	await mdb.collection(`${COUNTRY}-all-devices`).deleteMany({})
	.catch(error => console.log(error));

	console.log("all-devices has been cleared.");

	client.close();
}

init();