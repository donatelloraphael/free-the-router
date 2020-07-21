import axios from 'axios';

export default function ({ req, res, store }) {
	
	if (process.server) {

		let ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').shift() : req.connection.remoteAddress;

		return axios.get("https://geolocation-db.com/json/" + ip)
		.then(result => {
			store.dispatch("setCountry", result.data.country_code);	
		}).then(() => {
			return true;
		}).catch(error => console.log(error));

	}
}
