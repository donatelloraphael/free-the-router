export default function ({ req, res, store, redirect, params, route, query }) {
	
	if (process.server) {

		let fullPath = route.fullPath;

		let country = params.country || req.headers["cf-ipcountry"] || "us";
		country = country.toLowerCase();

		if (!params.country && route.path.split("/")[1] === "devices") {
			country = "us";
		}

		store.dispatch("setCountry", country);

		if (Object.keys(query).length) {

			if (route.path === "/shop" || route.path.toLowerCase() === `/${country}/shop`) {
				fullPath = fullPath.replace(route.path, (route.path + "/").toLowerCase());
			} else if (route.path !== "/shop/" && route.path !== `/${country}/shop/`) {
				fullPath = route.path.slice(-1) !== "/" ? (route.path + "/") : route.path;
			}		
		} else {
			fullPath = fullPath.slice(-1) !== "/" ? (fullPath + "/").toLowerCase() : fullPath.toLowerCase();
		}

		if (!params.country) {
			fullPath = `/${store.getters.getCountry}${fullPath}`;
		}

		if (store.getters.getCountry !== "us") {
			return redirect(fullPath);

		} else {
			const countryRegex = new RegExp(`\/${country}(\/|$)`);
			return redirect(fullPath.replace(countryRegex, "/"));
		}
	}
}
