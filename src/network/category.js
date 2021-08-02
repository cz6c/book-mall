import { request } from './request'

//
export function getcategory() {
    return request({
        url: '/api/goods',
    })
}