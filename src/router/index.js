import { createRouter, createWebHistory } from "vue-router"

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
        path: '/',
        component: () => import('@/pages/SelectCategory'),
        meta: {
            keepAlive: true,
            isBack: false
        }
    },
    {
        path: '/VideoDetails',
        name: "VideoDetails",
        component: () => import('@/pages/VideoDetails')
    },
    /*{
        path: '/test2',
        name: "test2",
        component: () => import('@/pages/test2')
    },*/
]
export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router