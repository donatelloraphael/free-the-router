import Vuex from 'vuex';
import axios from 'axios';

import TopPicksModule from '@/store/TopPicks';

const createStore = () => {
	return new Vuex.Store({

		modules: {
			TopPicksModule
		},

		state: () => ({
			selectedCountry: "",
			flagUrl: ""
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
			nuxtServerInit(vuexContext, context) {
			
							// TODO: set initial country
				vuexContext.dispatch("setCountry", "india");
				vuexContext.dispatch("setFlagUrl", vuexContext.state.selectedCountry);
			},
			setCountry(vuexContext, country) {
				vuexContext.commit("setCountry", country);
			},
			setFlagUrl(vuexContext, country) {
				vuexContext.commit("setFlagUrl", country);
			},

			parseFirestore(vuexContext, response) {
				// console.log(response);
				const parsedArray = [];
				if (!response.data.documents) {
					console.log("Cannot load resources");
					return null;
				}
				response.data.documents.forEach((item, index) => {
					const itemsArray = [];
					const entries = Object.entries(item.fields);
					for (const [property, value] of entries) {
						let singleItem = {};
						singleItem[property] = Object.values(value)[0];
						
						itemsArray.push(singleItem);
					}
					parsedArray.push(itemsArray);
				});
				return parsedArray;
			}
				
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