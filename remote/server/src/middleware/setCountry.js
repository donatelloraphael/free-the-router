export default function ({ req, res, store, redirect, params, route, query }) {
	
	if (process.server) {

		let country = params.country || req.headers["cf-ipcountry"] || "us";
		country = country.toLowerCase();

		let fullPath = route.fullPath;
		if (!Object.keys(query).length) {
			fullPath = fullPath.slice(-1) != "/" ? (fullPath + "/").toLowerCase() : fullPath.toLowerCase();

		} else if (route.path == "/shop" || route.path.toLowerCase() == `/${country}/shop`) {
			fullPath = fullPath.replace(route.path, (route.path + "/").toLowerCase());
		}

		if (params.device) {
			fullPath = fullPath.replace(params.device, params.device.toUpperCase());
		}

		if (!params.country) {
			fullPath = `/${country}${fullPath}`;
		}
		if (country != "us") {
			store.dispatch("setCountry", country);
			return redirect(fullPath);

		} else {
			const countryRegex = new RegExp(`\/us(\/|$)`);
			return redirect(fullPath.replace(countryRegex, "/"));
		}
	}
}
