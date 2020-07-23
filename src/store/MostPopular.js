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

	getters: {
		getMostPopular(state) {
			return state.mostPopular;
		}
	},

	actions: {
		populateMostPopular(vuexContext) {
			let mostPopularArray = [];

	    if (vuexContext.getters.getMostPopular.length > 0) {
				return vuexContext.getters.getMostPopular;

			} else {
				
				return db.collection("most-popular").get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						mostPopularArray.push(doc.data());
					});
				}).then(() => vuexContext.commit("setMostPopular", mostPopularArray))
				.then(() => {
					return mostPopularArray;
				}).catch(error => console.log(error));
			}
		}
	}

};

export default MostPopularModule;