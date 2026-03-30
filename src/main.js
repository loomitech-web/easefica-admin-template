import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './assets/css/main.scss';

import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);

const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

Vue.component('headline', import('./components/Headline'));

// Import the Auth0 configuration
import * as options from "../auth_config.json";

// Import the plugin here
import { AuthLock } from './auth-lock';

// Install the authentication plugin here
Vue.use(AuthLock, options.default, router);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
