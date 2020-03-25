import axios from "axios";

const czHttp = axios.create({
    timeout: 100000,  // 请求超时的配置
});

// 设置post请求头
czHttp.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// request 的拦截----自定义相关操作
czHttp.interceptors.request.use(config => {
    // console.log("请求头的配置",config)
    // 在此处可设置请求头
    return config;
}, error => {
    throw new Error(error);
});

// response 的拦截----自定义相关操作
czHttp.interceptors.response.use(({data, status}) => {
    // 在此处处理后端返回的数据
    if (status === 200) { // 说明后端已经正常返回数据

    } else {
    }
}, error => {
    throw new Error(error);
});

export default czHttp;