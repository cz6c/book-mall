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
    {
        path: '/about',
        component: () =>
            import ('../views/profile/childcomps/About')
    },
    {
        path: '/account',
        component: () =>
            import ('../views/profile/childcomps/Account')
    },
    {
        path: '/address',
        component: () =>
            import ('../views/profile/childcomps/address/Address')
    },
    {
        path: '/addressedit/:id',
        component: () =>
            import ('../views/profile/childcomps/address/AddressEdit')
    },
    {
        path: '/addressadd',
        component: () =>
            import ('../views/profile/childcomps/address/AddressAdd')
    },
    {
        path: '/collection',
        component: () =>
            import ('../views/profile/childcomps/Collection')
    },
    {
        path: '/order',
        component: () =>
            import ('../views/profile/childcomps/order/Order')
    }, {
        path: '/preview',
        component: () =>
            import ('../views/profile/childcomps/order/Preview')
    },



]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//????????????????????????????????????????????????next()??????????????????
router.beforeEach((to, from, next) => {
    //???????????????????????????????????????????????????vuex????????????isToken???false(????????????)???????????????????????????
    //??????????????????
    if (to.meta.isAuthenticated && store.state.isToken === false) {
        Toast.fail('?????????????????????')
        return next('/Login')
    } else { next() }
})

export default router