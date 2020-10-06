const { toXML } = require('jstoxml');
const fs = require('fs');

const MONGO_PWD = require("./env").MONGO_PWD;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://defaultReadWrite:${MONGO_PWD}@freetherouter.dm5jh.mongodb.net/freetherouter?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let mdb;

let urlArray = [];
let countries = ["us", "ca", "gb", "in"];
let num = 0;

async function makeSitemap() {

	await client.connect();
	mdb = client.db("freetherouter");

	await makeUrlArray();

	client.close();

	const xmlOptions = {
	  header: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
	};

	let sitemap = toXML({
		_name: 'urlset',
		_attrs: {
			xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
		},
		_content: urlArray
	}, xmlOptions);

	fs.writeFile("../server/src/static/sitemap.xml", sitemap, err => {
		if (err) return console.log(err);
	});

}

async function makeUrlArray() {

	if (num < countries.length) {

		let index = [];
		let devices = [];
		let country = "";

		await mdb.collection("indices").findOne({ name: `${countries[num]}-all-devices-index` })
		.then(doc => {
			if (doc) {
				index = doc.fullNameIndex;
			}
		}).catch(error => console.log(error));

		index.forEach(device => {
			devices.push(device.trim().replace(/\ /gm, "-"));
		});

		if (countries[num] == "us") {
			country = "";
		} else {
			country = countries[num] + "/";
		}

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}`,
				lastmod: new Date().toISOString(),
				changefreq: "daily",
				priority: 1
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}shop/`,
				lastmod: new Date().toISOString(),
				changefreq: "daily",
				priority: 0.9
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}firmware/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}supported-devices/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}resources/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}about/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${country}sitemap/`,
				priority: 0.4
			}
		});

		devices.forEach(device => {
			urlArray.push({
				url: {
					loc: `https://freetherouter.com/${country}devices/${device}/`,
					priority: 0.7
				}
			});
		});

		num++;
		await makeUrlArray();	
	}
}

makeSitemap();