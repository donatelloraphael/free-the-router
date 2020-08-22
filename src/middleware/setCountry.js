import axios from 'axios';

export default function ({ req, res, store, redirect, params, route, query }) {
	
	if (process.server) {
		
		let fullPath = route.fullPath;
		if (!Object.keys(query).length) {
			fullPath = /^.*(?<!\/)$/.test(fullPath) ? fullPath + "/" : fullPath;
		} else if (route.path == `/${params.country}/shop`) {
			fullPath = fullPath.replace(route.path, route.path + "/");
		}

		if (params.device) {
			fullPath = fullPath.replace(params.device, params.device.toUpperCase());
		}

		let country = params.country ? params.country.toUpperCase() : null;
		
		if (country == "UK") {
			country = "GB";
		}

		if (country == "US" || country == "GB" || country == "CA" || country == "IN") {
			store.dispatch("setCountry", country);
			const countryRegex = new RegExp(`\/${params.country}(\/|$)`);
			return redirect(fullPath.replace(countryRegex, "/" + country + "/"));
			
		} else {
			let ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').shift() : req.connection.remoteAddress;

			return axios.get("https://geolocation-db.com/json/" + ip)
			.then(result => {
				store.dispatch("setCountry", result.data.country_code.toUpperCase());	
				return redirect(`/${store.getters.getCountry}/`);
			}).catch(error => console.log(error));	
		}
	}
}
