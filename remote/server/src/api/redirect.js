export default function (req, res, params, route, query, next) {
  
  let fullPath = route.fullPath;

	let country = params.country || req.headers["cf-ipcountry"] || "us";
	country = country.toLowerCase();

	if (!Object.keys(query).length) {
		fullPath = fullPath.slice(-1) != "/" ? (fullPath + "/").toLowerCase() : fullPath.toLowerCase();

	} else if (route.path == "/shop" || route.path.toLowerCase() == `/${country}/shop`) {
		fullPath = fullPath.replace(route.path, (route.path + "/").toLowerCase());
	}

	if (params.device) {
		fullPath = fullPath.replace(params.device, params.device.toUpperCase());
		res.writeHead(301, { Location: fullPath });
	}

	if (!params.country) {
		fullPath = `/${country}${fullPath}`;
	}

	if (country != "us") {
		res.writeHead(301, { Location: fullPath });

	} else {
		const countryRegex = new RegExp(`\/us(\/|$)`);
		res.writeHead(301, {location: fullPath.replace(countryRegex, "/")});
	}

  
  next();
}