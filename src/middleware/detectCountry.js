import axios from 'axios';

export default async function (context) {
	
	if (!process.client) {
		const country = axios.get("https://geolocation-db.com/json/" + process.env.geolocationDBAPIKey)
								.then((result) => {
									return String(result.data.country_code);
								});
		context.store.dispatch("setCountry", await country);
		context.store.dispatch("setFlagUrl", await country);
	}
}
