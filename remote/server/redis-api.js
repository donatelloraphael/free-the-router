const Redis = require("ioredis");
const express = require("express");
const consola = require("consola");

const REDIS_PWD = require("./env").REDIS_PWD;
const redis = new Redis({ password: REDIS_PWD });

const app = express();

async function start() {

	app.get("/api/*", async (req, res) => {
		let argument = req.path.slice(5);
		let output = [];

		let result = await redis.lrange(argument, 0, -1);
		
		for (let i = 0, length = result.length; i < length; i++) {
			output.push(JSON.parse(result[i]));
		}

		res.send(output);
	});

	app.listen(9000, "127.0.0.1");

	consola.ready({
    message: `API server listening on http://127.0.0.1:9000`,
    badge: true
  });
}

start();