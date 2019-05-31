import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import http from './http/http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './static/css/reset.css'
Vue.config.productionTip = false;
Vue.prototype.axios=axios;
Vue.prototype.http=http;
Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
