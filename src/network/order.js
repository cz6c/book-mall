import { request } from './request'

//获取订单列表
export function orderList(status) {
    return request({
        url: '/api/orders',
        status
    })
}

//提交订单
export function setOrder(id) {
    return request({
        url: '/api/orders',
        method: 'post',
        id
    })
}