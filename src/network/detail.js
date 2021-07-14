import { request } from './request'


export function getDetaildata(id) {
    return request({
        url: '/api/goods/' + id,
        //Query 请求参数  ?后面的
        //         params: {
        //             id
        //         }
    })
}