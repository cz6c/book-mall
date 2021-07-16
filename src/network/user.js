import { request } from './request'


export function register(data) {
    return request({
        url: '/api/auth/register',
        method: 'post', //注册登录需要改为post方法
        data
    })
}

export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post', //注册登录需要改为post方法
        data
    })
}

export function logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post', //注册登录需要改为post方法
    })
}