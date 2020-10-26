const COUNTRY = "nl";

const MONGO_PWD = require("../../env").MONGO_PWD;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const firmwares = ["advancedtomato", "asusMerlin", "ddwrt", 
									"freshtomato", "openwrt", "gargoyle", "tomatobyshibby"];

async function createTopPicksMostPopular() {

	await client.connect();
	let mdb = client.db("freetherouter");

	let topPicks = {}, mostPopular = [];

	try {
		for (let i = 0; i < firmwares.length; i++) {
			let query = {};
			query[`${firmwares[i]}Support`] = true;
			topPicks[firmwares[i]] = await mdb.collection(`${COUNTRY}-routers`).find(query).sort({ serialNumber: 1 }).limit(3).toArray();
		}

		await mdb.collection(`${COUNTRY}-featured`).updateOne({ name: "top picks" }, {$set: topPicks }, { upsert: true });

	} catch (error) {
		console.log(error);
	}

	try {
		mostPopular = await mdb.collection(`${COUNTRY}-routers`).find({}).sort({ serialNumber: 1 }).limit(18).toArray();

		await mdb.collection(`${COUNTRY}-featured`).updateOne({ name: "most popular" }, {$set: { devices: mostPopular } }, { upsert: true });

	} catch (error) {
		console.log(error);
	}
	console.log("Top Picks and Most Popular created.");
	
	client.close();
}
 
createTopPicksMostPopular();
