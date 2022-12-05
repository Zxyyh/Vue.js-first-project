import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import JwPagination from 'jw-vue-pagination';
import VueFloatLabel from 'vue-float-label';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueAlertify from 'vue-alertify';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faEdit,
  faTrash,
  faEye,
  faPencilAlt,
  faUserEdit,
  faArrowAltCircleLeft,
  faList,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faEdit,
  faTrash,
  faEye,
  faPencilAlt,
  faUserEdit,
  faArrowAltCircleLeft,
  faList,
  faUserPlus,
  faChartBar
);

Vue.config.productionTip = false;
Vue.use(VueAlertify);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jw-pagination', JwPagination);
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueFloatLabel);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
