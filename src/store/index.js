import { createStore } from 'vuex'

export default createStore({
    //把sate中的数据状态存在本地缓存中，解决刷新页面数据消失问题
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        isToken: false //控制登录权限
    },
    mutations: {
        getIsToken(state, payload) {
            state.isToken = payload
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {}
})