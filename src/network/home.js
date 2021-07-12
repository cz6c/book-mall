import { request } from './request'

//中间加一层封装，把所有关于home网络请求数据的方法集中管理，我们只需要在Home.vue中导入这些方法，并且调用来请求对应接口的数据，避免过度耦合
export function getHomeMultidata() {
    return request({
        url: '/api/index'
    })
}