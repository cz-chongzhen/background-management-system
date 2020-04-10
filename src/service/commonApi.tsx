import czHttp from "./czHttp";
import {ILoginProps, IRegisterProps} from "./interface";
//@ts-ignore
const baseUrl: string = window.urlConfig.baseUrl;


/**
 * 登录方法
 * @param reqBody
 */
export const czLogin = (reqBody: ILoginProps) => {
    return czHttp.post(`${baseUrl}/auth-service/account/login`, JSON.stringify(reqBody));
};

/**
 * 注册方法
 * @param reqBody
 */
export const czRegister = (reqBody: IRegisterProps) => czHttp.post(`${baseUrl}/auth-service/account/register`, JSON.stringify(reqBody));