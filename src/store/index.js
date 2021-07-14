import { createStore } from 'vuex'

export default createStore({
    state: {
        isDetail: true, //详情页tabbar显示隐藏
        cartList: []
    },
    mutations: {
        getIsDetall(state) {
            state.isDetail = false
        },
        getBackDetall(state) {
            state.isDetail = true
        },
        addCount(state, oldProduct) {
            oldProduct.count++ //已存在就给商品数量加1
        },
        addProduct(state, payload) {
            state.cartList.push(payload) //不存在的商品push到数组中
        }
    },
    actions: {
        addCart(context, payload) {
            //判断新添加的商品是否已经添加过
            let oldProduct = context.state.cartList.find(item => item.id === payload.id)
            if (oldProduct) {
                context.commit('addCount', oldProduct)
            } else {
                payload.count = 1 //不存在就给新传过来的商品定义数量属性并记录为1
                context.commit('addProduct', payload)
            }
        }
    },
    modules: {}
})