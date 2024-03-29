//axiosInstance.js
//导入axios
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const Axios = axios.create({
    // baseURL:'http://localhost:8080', //请求后端数据的基本地址，自定义
    // baseURL:'r1w8478651.imwork.net:8080', //请求后端数据的基本地址，自定义
    // baseURL:'r1w8478651.imwork.net:9998', //请求后端数据的基本地址，自定义
    // baseURL:'http://192.168.0.102:8080', //请求后端数据的基本地址，自定义
    // baseURL:'http://192.168.0.157:8080', //请求后端数据的基本地址，自定义
    // baseURL:'http://192.168.1.158:8080', //请求后端数据的基本地址，自定义
    baseURL: '/api',
    timeout: 20000                   //请求超时设置，单位ms
})

//导出我们建立的axios实例模块，ES6 export用法
export default Axios
