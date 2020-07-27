const axios = require('axios');

exports.pingSite = async function() {
	return await axios.get("https://free-the-router-13e19.web.app/")
	.then(() => {
		console.log("Site Pinged.");
		return true;
	}).catch(error => console.log(error));
};