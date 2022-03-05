import axios from 'axios'
import global from './global'

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    baseURL: global.address.zuul,
    timeout: 15000 // 请求超时时间
})

const responseFun = function (response) {
    return response.data;
}

// respone拦截器
service.interceptors.response.use(
    responseFun,
    error => {
        return Promise.reject(error)
    }
)

export default service;