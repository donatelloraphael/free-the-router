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

		let result = await redis.hgetall(argument);
		
		Object.values(result).forEach(doc => {
			output.push(JSON.parse(doc));
		});

		res.send(output);
	});

	app.get("/devices/*", async (req, res) => {
		let argument = req.path.slice(1).split("/");

		let result = await redis.hget(argument[1], argument[2]);

		res.send(result);
	});

	app.listen(9000, "127.0.0.1");

	consola.ready({
    message: `API server listening on http://127.0.0.1:9000`,
    badge: true
  });
}

start();