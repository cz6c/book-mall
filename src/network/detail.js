import { request } from './request'


export function getDetaildata(id) {
    return request({
        url: '/api/goods/' + id,

    })
}