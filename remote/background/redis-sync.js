// Sync collections from MongoDB to Redis

const MONGO_PWD_READ = require("./env").MONGO_PWD_READ;
const REDIS_PWD = require("./env").REDIS_PWD;
const MongoClient = require('mongodb').MongoClient;

const Redis = require("ioredis");
const redis = new Redis({ password: REDIS_PWD });

const uri = `mongodb+srv://readOnly:${MONGO_PWD_READ}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

async function redisSync() {

		const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		await client.connect();
		const mdb = client.db("freetherouter");

		const collections = await mdb.listCollections({}, {nameOnly: true}).toArray();

		for (let i = 0, length = collections.length; i < length; i++) {

			await mdb.collection(collections[i].name).find().toArray()
			.then(async docs => {
				await redis.del(collections[i].name);
				docs.forEach(async device => {
					await redis.hset(collections[i].name, device.id || device.fullName || device.name, JSON.stringify(device));
				});
				console.log(`${collections[i].name} - collection synced`);
			}).catch(error => console.log(error));
		}


		client.close();
		redis.disconnect();
}

redisSync();