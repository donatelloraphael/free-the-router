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
			const mostPopularArray = [];

			return db.collection("most-popular").get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						mostPopularArray.push(doc.data());
					})
				}).then(() => mostPopularArray);
		}
	}

};

export default MostPopularModule;