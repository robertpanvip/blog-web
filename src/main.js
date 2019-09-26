import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import http from './http/http'
import 'element-ui/lib/theme-chalk/index.css';
import './static/css/reset.css'
import {Button, Tabs, TabPane, Dialog, Message, Notification, Carousel,CarouselItem, MessageBox} from 'element-ui';
Vue.use(Button)
Vue.use(Tabs)
Vue.use(Dialog)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.http = http;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
