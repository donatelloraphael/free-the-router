import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const MostPopularModule = {
	namespaced: true,

	state() {
		return {
			mostPopular: []
		};
	},

	mutations: {
		setMostPopular(state, mostPopularArray) {
			state.mostPopular = mostPopularArray;
		}
	},

	actions: {
		populateMostPopular(vuexContext) {
			let mostPopularArray = [];
	    var topPicksMostPopularExpirationTime;
	    const currentTime = new Date().getTime();
	    // console.log('current: ', currentTime);


			if (process.client) {
	    	topPicksMostPopularExpirationTime = localStorage.getItem("topPicksMostPopularExpirationTime");
	    }

	    // console.log('stored: ', Number.parseInt(topPicksMostPopularExpirationTime));
	    // console.log('check: ', (!topPicksMostPopularExpirationTime || (Number.parseInt(topPicksMostPopularExpirationTime)) < currentTime));


	    if (!topPicksMostPopularExpirationTime || (Number.parseInt(topPicksMostPopularExpirationTime)) < currentTime) {
				return db.collection("most-popular").get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							mostPopularArray.push(doc.data());
						});
					}).then(() => vuexContext.commit("setMostPopular", mostPopularArray))
					.then(() => {
						return mostPopularArray;
					}).catch(error => console.log(error));
			} else {
				mostPopularArray = JSON.parse(localStorage.mostPopularArray);
				vuexContext.commit("setMostPopular", mostPopularArray);
				// console.log(vuexContext.state.mostPopular);
				return mostPopularArray;
			}
		}
	}

};

export default MostPopularModule;