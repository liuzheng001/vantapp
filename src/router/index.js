import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/fmcontent',
        component: () => import('@/pages/RestfulApiContent'),
        meta: {
            keepAlive: false,
            isBack: false
        }
    },
    {
        path: '/login',
        component: () => import('@/pages/RestfulApiLogin'),
        meta: {
            keepAlive: false,
            isBack: false
        }
    },
    {
        path: '/selectCategory',
        component: () => import('@/pages/SelectCategory'),
        meta:{
            keepAlive:true // 需要缓存
        },
        name:'SelectCategory',
        // props:true,
    },
    {
        path: '/',
        component: () => import('@/pages/HomePage'),
        meta: {
            keepAlive: true,
            isBack: false
        }
    },
    {
        path: '/ListPage',
        component: () => import('@/pages/ListPage'),
        meta: {
            keepAlive: true,
            isBack: false
        },
        props:true,
    },
    {
        path: '/VideoDetails',
        name: "VideoDetails",
        component: () => import('@/pages/VideoDetails')
    },
    {
        path: '/RecommentDetail',
        name: "RecommentDetail",
        component: () => import('@/pages/RecommentDetail')
    },
    /*{
        path: '/test2',
        name: "test2",
        component: () => import('@/pages/test2')
    },*/
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router