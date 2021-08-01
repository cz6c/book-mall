import { request } from './request'

//中间加一层封装，把所有关于home网络请求数据的方法集中管理，我们只需要在Home.vue中导入这些方法，并且调用来请求对应接口的数据，避免过度耦合
export function getHomeMultidata() {
    return request({
        url: '/api/index'
    })
}

export function getHomeGoodsdata(type, page) {
    return request({
        //当传的参数的参数名本身就是个变量时
        //不建议用params对象的形式传，应该传变量过来手动拼接
        url: '/api/index?' + type + '=1&page=' + page,
    })

}