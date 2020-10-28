const { toXML } = require('jstoxml');
const fs = require('fs');
const Redis = require("ioredis");

const REDIS_PWD = require("./env").REDIS_PWD;
const redis = new Redis({ password: REDIS_PWD });

let urlArray = [];
let countries = ["us", "ca", "gb", "in", "fr", "de", "mx"];
let num = 0;

async function makeSitemap() {

	await makeUrlArray();

	redis.disconnect();

	const xmlOptions = {
	  header: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
	};

	let sitemap = toXML({
		_name: 'urlset',
		_attrs: {
			xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
			"xmlns:xhtml": "http://www.w3.org/1999/xhtml"
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

		index = await redis.hkeys(`${countries[num]}-all-devices`);

		index.forEach(device => {
			devices.push(device.trim().toLowerCase());
		});

		if (countries[num] == "us") {
			country = "";
		} else {
			country = countries[num] + "/";
		}

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}` },
				{ lastmod: new Date().toISOString() },
				{ changefreq: "daily" },
				{ priority: 1 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/"
					}
	      }
			]
		});

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}shop/` },
				{ lastmod: new Date().toISOString() },
				{ changefreq: "daily" },
				{ priority: 1 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/shop/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/shop/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/shop/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/shop/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/shop/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/shop/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/shop/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/shop/"
					}
	      }
			]
		});

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}firmware/` },
				{ priority: 1 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/firmware/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/firmware/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/firmware/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/firmware/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/firmware/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/firmware/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/firmware/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/firmware/"
					}
	      }
			]
		});

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}supported-devices/` },
				{ priority: 0.6 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/supported-devices/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/supported-devices/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/supported-devices/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/supported-devices/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/supported-devices/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/supported-devices/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/supported-devices/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/supported-devices/"
					}
	      }
			]
		});

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}resources/` },
				{ priority: 0.6 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/resources/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/resources/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/resources/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/resources/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/resources/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/resources/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/resources/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/resources/"
					}
	      }
			]
		});

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}about/` },
				{ priority: 0.4 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/about/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/about/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/about/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/about/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/about/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/about/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/about/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/about/"
					}
	      }
			]
		});	

		urlArray.push({
			url: [
				{ loc: `https://freetherouter.com/${country}sitemap/` },
				{ priority: 0.4 },
				{
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-us",
		        href: "https://freetherouter.com/sitemap/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-gb",
          	href: "https://freetherouter.com/gb/sitemap/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-ca",
		        href: "https://freetherouter.com/ca/sitemap/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-in",
          	href: "https://freetherouter.com/in/sitemap/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-fr",
		        href: "https://freetherouter.com/fr/sitemap/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "en-de",
          	href: "https://freetherouter.com/de/sitemap/"
					}
	      },
	      {
					_name: "xhtml:link",
					_attrs: {
						rel: "alternate",
		        hreflang: "en-mx",
		        href: "https://freetherouter.com/mx/sitemap/"
	        }
	      },
	      {
	        _name: "xhtml:link",
					_attrs: {
						rel: "alternate",
          	hreflang: "x-default",
          	href: "https://freetherouter.com/sitemap/"
					}
	      }
			]
		});

		devices.forEach(device => {
			urlArray.push({
				url: [
					{ loc: `https://freetherouter.com/${country}devices/${device}/` },
					{ priority: 0.7 }
				]
			});
		});

		num++;
		await makeUrlArray();	
	}
}

makeSitemap();