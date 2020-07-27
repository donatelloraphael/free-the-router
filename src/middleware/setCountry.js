import axios from 'axios';

export default function ({ req, res, store, redirect, params, route }) {
	
	if (process.server) {
		let country = params.country ? params.country.toUpperCase() : null;

		if (country == "US" || country == "UK" || country == "CA" || country == "IN") {
			store.dispatch("setCountry", country);
			const countryRegex = new RegExp(`(\/${params.country}\/?|$)`);
			return redirect(route.fullPath.replace(countryRegex, "/" + country + "/"));

		} else {

			let ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').shift() : req.connection.remoteAddress;

			return axios.get("https://geolocation-db.com/json/" + ip)
			.then(result => {
				store.dispatch("setCountry", result.data.country_code);	
			}).then(() => {
				return redirect(`/${store.getters.getCountry}/`);
			}).catch(error => console.log(error));
		}
	}
}
