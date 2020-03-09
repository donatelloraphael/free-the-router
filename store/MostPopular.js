import Vuex from 'vuex';

import {db} from '~/plugins/firebase.js';

const MostPopularModule = {
	namespaced: true,

	state() {
		return {
			mostPopular: []
		}
	},

	mutations: {
		setMostPopular(state, mostPopularArray) {
			state.mostPopular = mostPopularArray
		}
	},

	actions: {
		populateMostPopular(vuexContext) {
			const expirationTimer = 3600;
			const mostPopularArray = [];
	    var topPicksMostPopularTime;

			if (process.client) {
	    	topPicksMostPopularTime = localStorage.getItem("topPicksMostPopularTime");
	    }

	    if (!topPicksMostPopularTime || (Number.parseInt(topPicksMostPopularTime) + expirationTimer * 1000) < new Date().getTime()) {
				return db.collection("most-popular").get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							mostPopularArray.push(doc.data());
						})
					}).then(() => mostPopularArray);
			} else {
				return JSON.parse(localStorage.mostPopularArray);
			}
		}
	}

};

export default MostPopularModule;