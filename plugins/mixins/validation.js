import Vue from 'vue';
const MAX_LENGTH = 255;

Vue.mixin({
	data() {
		return {
			valid: false,
			emptyRule: [value => !!value || 'Field is empty']
		};
	}
});
