import { request } from './request'


//添加地址
export function address(data) {
    return request({
        url: '/api/address',
        method: 'post',
        data
    })
}

//获取地址列表
export function addressList() {
    return request({
        url: '/api/address',
    })
}

//获取地址详情
export function addressDetail(address) {
    return request({
        url: '/api/address/' + address,
    })
}

//更新地址
export function addressUpdate(address, data) {
    return request({
        url: '/api/address/' + address,
        method: 'put',
        data
    })
}

//删除地址
export function addressRemove(address) {
    return request({
        url: '/api/address/' + address,
        method: 'delete'
    })
}

//设置默认地址
export function addressDefault(address) {
    return request({
        url: '/api/address/' + address + '/default',
        method: 'patch'
    })
}