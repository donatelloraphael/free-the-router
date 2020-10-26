const COUNTRY = "de";

const MONGO_PWD = require("../../env").MONGO_PWD;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let mdb;

async function createOldIndex() {

	let index = [];

	await client.connect();
	mdb = client.db("freetherouter");

	await mdb.collection("indices").findOne({ name: `${COUNTRY}-all-devices-index` })
	.then(doc => {
		if (doc) {
			index = doc.fullNameIndex;
		}
	}).catch(error => console.log(error));

	await mdb.collection("indices").updateOne({ name: `${COUNTRY}-old-index` }, { $set: { fullNameIndex: index } }, { upsert: true })
	.then(() => {
		console.log(`${COUNTRY}-old-index created`);
	}).catch(error => console.log(error));

	client.close();

}

createOldIndex();