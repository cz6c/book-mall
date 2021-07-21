import { request } from './request'

//收藏和取消收藏
export function collection(id) {
    return request({
        url: '/api/collects/goods/' + id,
        method: 'post',
    })
}

//收藏列表
export function collects() {
    return request({
        url: '/api/collects',
    })
}