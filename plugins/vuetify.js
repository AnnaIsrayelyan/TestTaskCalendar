import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default ctx => {
	const vuetify = new Vuetify({
		theme: {
			dark: false
		}
	});

	ctx.app.vuetify = vuetify;
	ctx.$vuetify = vuetify.framework;
};
