import axios from 'axios';

export default async function ({ req, store }) {
	
	// if (!process.client) {
	// 	const country = axios.get("https://geolocation-db.com/json/" + process.env.geolocationDBAPIKey)
	// 										.then((result) => {
	// 											return String(result.data.country_code);
	// 										});

	// 	console.log(req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').pop() : req.connection.remoteAddress);
	// 	store.dispatch("setCountry", await country);
	// }
}
