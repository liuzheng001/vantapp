import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: () => import('@/pages/SelectCategory'),
        meta: {
            keepAlive: true,
            isBack: false
        }
    },
    {
        path: '/test1',
        name: "test1",
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