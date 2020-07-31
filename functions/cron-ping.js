const axios = require('axios');

exports.pingSite = async function() {
	return await axios.get("https://freetherouter.com/")
	.then(() => {
		console.log("Site Pinged.");
		return true;
	}).catch(error => console.log(error));
};