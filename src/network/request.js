//导入axios
import axios from 'axios'

//封装网络请求模块
export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    //axios拦截器

    //请求拦截
    instance.interceptors.request.use(config => {
        //1.config中的一些信息不符合服务器的要求
        //2.每次发送网络请求，都在界面显示一个请求加载图标
        //3.某些网络请求（比如登录（token）），必须携带一些特殊信息
        return config //处理完后要把拦截下来的config返回出去
    }, err => {
        //请求拦截失败
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        //一般在这里过滤，返回res.data,后面就直接拿到了data数据
        return res.data ? res.data : res

    }, err => {
        console.log(err);
    })

    //发送真正的网络请求，相当于返回出去了一个promise函数
    return instance(config)
}