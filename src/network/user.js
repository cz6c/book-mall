import { request } from './request'

//注册
export function register(data) {
    return request({
        url: '/api/auth/register',
        method: 'post', //注册登录需要改为post方法
        data
    })
}

//登录
export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post', //注册登录需要改为post方法
        data
    })
}

//登出
export function logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post', //注册登录需要改为post方法 
    })
}

//获取用户信息
export function getuser() {
    return request({
        url: '/api/user',
    })
}