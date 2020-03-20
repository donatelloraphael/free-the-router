const axios = require('axios');
const $ = require('cheerio');


axios.get("https://sourceforge.net/projects/asuswrt-merlin/files/")
	.then((res) => {
		$(".name", res.data).each((i, element) => {
			console.log($(element).text());
		})
	});