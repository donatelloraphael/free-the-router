import Vue from 'vue'
import Vuex from 'vuex';

import TopPicksModule from '@/store/TopPicks';
import MostPopularModule from '@/store/MostPopular';

Vue.use(Vuex);

const createStore = () => {
	return new Vuex.Store({

		modules: {
			TopPicksModule,
			MostPopularModule
		},

		state: () => ({
			selectedCountry: "US",
			flagUrl: `url(${require(`assets/images/country-flags/US.png`)})`
		}),

		mutations: {
			setCountry(state, country) {
				state.selectedCountry = country;
			},
			setFlagUrl(state, country) {

				// webpack isn’t smart enough to understand that you want some part of some string in your code 
				//interpreted as a path that it should resolve. That works in HTML and CSS because of their 
				//static nature, but not inside of Javasript code. So you have to 'require' the path:

				state.flagUrl = `url(${require(`assets/images/country-flags/${country}.png`)})`;
			}
		},


		actions: {
			setCountry(vuexContext, country) {
				if (!country) {
					return;
				}
				if (process.client) {
					localStorage.setItem("storedCountry", country);
					localStorage.setItem("countryExpirationTime", new Date().getTime() + (86400 * 1000));
				}
				vuexContext.commit("setCountry", country);
			},
			setFlagUrl(vuexContext, country) {
				if (!country) {
					return;
				}
				vuexContext.commit("setFlagUrl", country);
			},
			initializeCountry(vuexContext, country) {
				let countryExpirationTime;

				if (process.client) {
	    		countryExpirationTime = localStorage.getItem("countryExpirationTime");
	    	}
	    	if (!countryExpirationTime || (Number.parseInt(countryExpirationTime)) < new Date().getTime()) {
	    		vuexContext.dispatch("setCountry", country);
	    		vuexContext.dispatch("setFlagUrl", country);
	    	} else {
	    		const storedCountry = localStorage.getItem("storedCountry");
	    		vuexContext.dispatch("setCountry", storedCountry);
	    		vuexContext.dispatch("setFlagUrl", storedCountry);
	    	}
			}

			//////////////////Function to parse Firestore API Query////////////////////////
			
			// parseFirestore(vuexContext, response) {
			// 	const parsedArray = [];
			// 	if (!response.data.documents) {
			// 		console.log("Cannot load resources");
			// 		return null;
			// 	}
			// 	response.data.documents.forEach((item, index) => {
			// 		const itemsArray = [];
			// 		const entries = Object.entries(item.fields);
			// 		for (const [property, value] of entries) {
			// 			let singleItem = {};
			// 			singleItem[property] = Object.values(value)[0];
						
			// 			itemsArray.push(singleItem);
			// 		}
			// 		parsedArray.push(itemsArray);
			// 	});
			// 	return parsedArray;
			// }
		},

		
		getters: {
			getCountry(state) {
				return state.selectedCountry;
			},
			getFlagUrl(state) {
				return state.flagUrl;
			}
		}
	});
};

export default createStore;