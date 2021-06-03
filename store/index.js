import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

const createStore = () => {
	return new Vuex.Store({
		state,
		getters,
		mutations,
		actions
	});
};

export default createStore;
