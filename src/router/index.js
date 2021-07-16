import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { Toast } from "vant";

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () =>
            import ('../views/home/Home'),

    }, {
        path: '/category',
        component: () =>
            import ('../views/category/Category')
    }, {
        path: '/cart',
        component: () =>
            import ('../views/cart/Cart'),
        meta: {
            isAuthenticated: true
        }
    }, {
        path: '/profile',
        component: () =>
            import ('../views/profile/Profile'),
        meta: {
            isAuthenticated: true
        }
    }, {
        path: '/detail/:id',
        component: () =>
            import ('../views/detail/Detail')
    }, {
        path: '/register',
        component: () =>
            import ('../views/profile/Register')
    }, {
        path: '/login',
        component: () =>
            import ('../views/profile/Login')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//全局导航前置守卫，跳转路由前回调next()函数进行操作
router.beforeEach((to, from, next) => {
    //如果跳转需要授权访问的页面并且此时vuex中存储的isToken为false(即未登录)时，跳转到登录页面
    //否则正常跳转
    if (to.meta.isAuthenticated && store.state.isToken === false) {
        Toast.fail('请先登录后访问')
        return next('/Login')
    } else { next() }
})

export default router