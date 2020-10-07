const Redis = require("ioredis");
const express = require("express");
const consola = require("consola");
const cors = require("cors");

const REDIS_PWD = require('./env').REDIS_PWD;
const PROTOCOL = require('./env').PROTOCOL;
const HOST = require('./env').HOST;
const redis = new Redis({ password: REDIS_PWD });

const app = express();

const corsOptions = {
	  origin: `http://${HOST}`,
	  methods: "GET,HEAD",
	  preflightContinue: false,
  	optionsSuccessStatus: 200
	};

app.use(cors(corsOptions));

async function start() {

	app.get("/category/*", async (req, res) => {
		let argument = req.path.slice(10);
		let output = [];

		let result = await redis.hgetall(argument);
		
		Object.values(result).forEach(doc => {
			output.push(JSON.parse(doc));
		});

		res.send(output);
	});

	app.get("/devices/*", async (req, res) => {
		let argument = req.path.slice(9).split("/");

		let result = await redis.hget(argument[0], argument[1]);

		res.send(result);
	});

	app.get("/search/*", async (req, res) => {
		let argument = req.path.slice(8);
		let output = {};

		let result = await redis.hgetall(argument);

		for (const [key, value] of Object.entries(result)) {
			output[key] = JSON.parse(value);
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