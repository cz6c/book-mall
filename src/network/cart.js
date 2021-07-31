import { request } from './request'

//加入购物车
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: 'post',
        data
    })
}

//获取购物车列表
export function getCart() {
    return request({
        url: '/api/carts?include=goods',
    })
}

//修改购物车商品数量
export function editCartGoodsCount(id, data) {
    return request({
        url: '/api/carts/' + id,
        method: 'PUT',
        data
    })
}

//移出购物车
export function outCart(id) {
    return request({
        url: '/api/carts/' + id,
        method: 'DELETE',
    })
}

//改变购物车选择
export function checked(data) {
    return request({
        url: '/api/carts/checked',
        method: 'PATCH',
        data
    })
}