import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

Vue.mixin({
	data() {
		return {};
	},
	methods: {
		...mapMutations(['setDrawer'])
	},
	computed: {
		drawer: {
			get() {
				return this.$store.state.drawer;
			},
			set(val) {
				this.setDrawer(val);
			}
		}
	}
});
