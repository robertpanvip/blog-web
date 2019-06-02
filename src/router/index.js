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
                {
                    path: '/articles',
                    name: 'articles',
                    component: () => import('@/page/ArticleList'),
                    meta: {name: 'articles'},
                },
                {
                    path: '/article',
                    name: 'article',
                    component: () => import('@/page/ArticleContent'),
                    meta: {name: 'article'},
                },
                {
                    path: '/follow',
                    name: 'follow',
                    component: () => import('@/page/Follow'),
                    meta: {name: 'follow'},
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
        },
        {
            path: '/person',
            name: 'person',
            component: () => import('@/page/PersonInfo'),
            meta: {name: 'person'},
        },

    ]
});
export default router;
