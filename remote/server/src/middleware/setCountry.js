export default function ({ req, res, store, redirect, params, route, query }) {
	
	if (process.server) {

		let fullPath = route.fullPath;

		let country = params.country || req.headers["cf-ipcountry"] || "us";
		country = country.toLowerCase();

		if (!params.country && route.path.split("/")[1] == "devices") {
			country = "us";
		}

		store.dispatch("setCountry", country);

		if (!Object.keys(query).length) {
			fullPath = fullPath.slice(-1) != "/" ? (fullPath + "/").toLowerCase() : fullPath.toLowerCase();

		} else if (route.path == "/shop" || route.path.toLowerCase() == `/${country}/shop`) {
			fullPath = fullPath.replace(route.path, (route.path + "/").toLowerCase());
		}

		if (!params.country) {
			fullPath = `/${store.getters.getCountry}${fullPath}`;
		}

		if (store.getters.getCountry != "us") {
			return redirect(fullPath);

		} else {
			const countryRegex = new RegExp(`\/${country}(\/|$)`);
			return redirect(fullPath.replace(countryRegex, "/"));
		}
	}
}
