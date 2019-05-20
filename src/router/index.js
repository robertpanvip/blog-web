import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
let router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main-index',
            redirect:()=>'/index',
            component: () => import('@/components/Main'),
            meta: {name: 'main-index'},
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: () => import('@/components/Index'),
                    meta: {name: 'index'},
                },

            ]
        },
        {
            path: '/sign',
            name: 'sign',
            component: () => import('@/page/Sign'),
            meta: {name: 'sign'},
        },
        {
            path: '/editor',
            name: 'editor',
            component: () => import('@/page/Editor'),
            meta: {name: 'editor'},
        }
    ]
});
export default router;
