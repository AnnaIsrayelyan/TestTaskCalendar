import Vue from 'vue';
import moment from 'moment';
import { mapGetters, mapMutations } from 'vuex';

Vue.mixin({
	data() {
		return {};
	},
	methods: {
		...mapMutations(['setDrawer']),
		getToday() {
			return moment().format('YYYY-MM-DD');
		}
	}
});
