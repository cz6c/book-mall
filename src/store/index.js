import { createStore } from 'vuex'

export default createStore({
    // state: {
    //     cartList: [],
    //     isToken: false //控制登录权限
    // },
    //把sate中的数据状态存在本地缓存中，解决刷新页面数据消失问题
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        cartList: [],
        isToken: false //控制登录权限
    },
    mutations: {
        addCount(state, oldProduct) {
            oldProduct.count++ //已存在就给商品数量加1
        },
        addProduct(state, payload) {
            state.cartList.push(payload) //不存在的商品push到数组中
        },
        getIsToken(state, payload) {
            state.isToken = payload
        }
    },
    actions: { //
        addCart(context, payload) {
            return new Promise((resolvee, reject) => {
                //判断新添加的商品是否已经添加过
                let oldProduct = context.state.cartList.find(item => item.id === payload.id)
                if (oldProduct) {
                    context.commit('addCount', oldProduct)
                    resolvee('商品数量加1')
                } else {
                    payload.count = 1 //不存在就给新传过来的商品定义数量属性并记录为1
                    payload.check = true //给新商品添加选中属性，默认为选中
                    context.commit('addProduct', payload)
                    resolvee('加入购物车成功')
                }
            })
        }
    },
    getters: {
        //计算商品总价格
        tolta(state) {
            return state.cartList.filter(item => item.check === true).reduce((prevalue, item) => {
                return prevalue + item.count * item.price
            }, 0)
        },
        //计算选中商品的种类
        checkCount(state) {
            return state.cartList.filter(item => item.check === true).length
        },
        //计算商品是否全部选中,有一个未选中就返回false，全部选中就返回true
        checkAll(state) {
            if (state.cartList.length === 0) { return false } else {
                return !state.cartList.some(item => item.check === false)
            }
        }
    },
    modules: {}
})