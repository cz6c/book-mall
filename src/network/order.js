import { request } from './request'

//订单预览
export function previewOrder() {
    return request({
        url: '/api/orders/preview'
    })
}

//提交订单
export function submitOrder(data) {
    return request({
        url: '/api/orders',
        method: 'POST',
        data
    })
}

//订单详情
export function orderDetails(id) {
    return request({
        url: '/api/orders/' + id,
    })
}

//订单列表
export function orderList(params) {
    return request({
        url: '/api/orders?include=orderDetails.goods',
        params
    })
}