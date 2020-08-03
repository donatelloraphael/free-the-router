const admin = require('firebase-admin');
const { toXML } = require('jstoxml');
const fs = require('fs');

const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

let urlArray = [];
let countries = ["IN", "US", "CA", "UK"];
let num = 0;

async function makeSitemap() {

	await makeUrlArray();

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

	fs.writeFile("./public/sitemap.xml", sitemap, err => {
		if (err) return console.log(err);
	});

}

async function makeUrlArray() {

	if (num < countries.length) {

		let index = [];
		let devices = [];

		await db.doc(`${countries[num]}/meta/indices/all-devices`).get()
		.then(doc => {
			if (doc.data()) {
				index = doc.data().fullNameIndex;
			}
		}).then(() => {
			index.forEach(device => {
				devices.push(device.trim().replace(/\ /gm, "-"));
			});
		}).catch(error => console.log(error));

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/`,
				lastmod: new Date().toISOString(),
				changefreq: "daily",
				priority: 1
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/shop/`,
				lastmod: new Date().toISOString(),
				changefreq: "daily",
				priority: 0.9
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/firmware/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/supported-devices/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/resources/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/about/`,
				priority: 0.8
			}
		});

		urlArray.push({
			url: {
				loc: `https://freetherouter.com/${countries[num]}/sitemap/`,
				priority: 0.4
			}
		});

		devices.forEach(device => {
			urlArray.push({
				url: {
					loc: `https://freetherouter.com/${countries[num]}/devices/${device}/`,
					priority: 0.7
				}
			});
		});

		num++;
		await makeUrlArray();	
	}
}

makeSitemap();