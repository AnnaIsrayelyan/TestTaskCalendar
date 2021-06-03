import Vue from 'vue';

Vue.mixin({
	data() {
		return {
			pageMounted: false
		};
	},
	methods: {
		beforeUnload(next) {
			const answer = window.confirm('Changes you made may not be saved.');
			if (answer) next();
			else next(false);
		}
	}
});
