import axios from 'axios';
// const geolite2 = require('geolite2');
// const maxmind = require('maxmind');


export default async function ({ store }) {
	
// 	// if (!process.client) {
// 	// 	const country = axios.get("https://geolocation-db.com/json/" + process.env.geolocationDBAPIKey)
// 	// 										.then((result) => {
// 	// 											return String(result.data.country_code);
// 	// 										});

// 	// 	console.log(req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').pop() : req.connection.remoteAddress);
// 	// 	store.dispatch("setCountry", await country);
// 	// }

// 	if (!process.client) {
// 		const lookup = maxmind.open(geolite2.paths.country);

// 		// const country = lookup.get(req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').pop() : req.connection.remoteAddress);
// 		// store.dispatch("setCountry", await country);
// 	}
}
