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
                {
                    path: '/person',
                    name: 'person',
                    component: () => import('@/page/PersonInfo'),
                    meta: {name: 'person'},
                    redirect:()=>'/person/history',
                    children: [
                        {
                            path: '/person/history',
                            name: 'publishHistory',
                            component: () => import('@/page/PublishHistory'),
                            meta: {name: 'publishHistory'},
                        },
                        {
                            path: '/person/collectionList',
                            name: 'collectionList',
                            component: () => import('@/page/CollectionList'),
                            meta: {name: 'collectionList'},
                        },
                        {
                            path: '/person/comment',
                            name: 'comment',
                            component: () => import('@/page/Comment'),
                            meta: {name: 'comment'},
                        },
                        {
                            path: '/person/leaveMessage',
                            name: 'leaveMessage',
                            component: () => import('@/page/LeaveMessage'),
                            meta: {name: 'leaveMessage'},
                        },
                        {
                            path: '/person/message',
                            name: 'message',
                            component: () => import('@/page/Message'),
                            meta: {name: 'message'},
                        },
                        {
                            path: '/person/userArticle',
                            name: 'userArticle',
                            component: () => import('@/page/UserArticle'),
                            meta: {name: 'userArticle'},
                        },

                    ]
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


    ]
});
export default router;
