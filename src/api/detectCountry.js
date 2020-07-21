const geolite2 = require('geolite2');
const maxmind = require('maxmind');

export default function(context) {
	let country = "";
	let ip = context.req.headers['x-forwarded-for'] ? context.req.headers['x-forwarded-for'].split(',').pop() : context.req.connection.remoteAddress;

	maxmind.open(geolite2.paths.country).then(lookup => {
		// country = lookup.get(ip);
		// store.dispatch("setCountry", country);
		console.log(ip);

	});
	
	

	next();
}