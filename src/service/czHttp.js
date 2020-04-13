import axios from "axios";
import {message} from "antd";

const czHttp = axios.create({
    timeout: 100000,  // 请求超时的配置
});

// 设置post请求头
czHttp.defaults.headers.post['Content-Type'] = 'application/json';


// request 的拦截----自定义相关操作
czHttp.interceptors.request.use(config => {
    // console.log("请求头的配置",config)
    // 在此处可设置请求头
    if (window.sessionStorage.getItem("access_token")) {
        config.headers['access_token'] = window.sessionStorage.getItem("access_token");
    }
    return config;
}, error => {
    throw new Error(error);
});

// response 的拦截----自定义相关操作
czHttp.interceptors.response.use(({data, status}) => {
    if (status === 200) { // 说明浏览器正常返回了
        const {appData, statusCode, message} = data;
        if (statusCode) {
            if (statusCode === 200) { // 说明后端已经正常返回数据
                return appData ? appData : true;
            } else {
                message.error(message);
                console.error(message);
                return false;
            }
        }
        return appData;
    } else {
        message.error("发生了一点错误，请查看控制台");
        return false;
    }
}, error => {
    console.error(error.response, '调用方法出错了')
    throw new Error(error);
});

export default czHttp;