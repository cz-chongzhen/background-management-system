import czHttp from "./czHttp";
import {ILoginProps, IRegisterProps} from "./interface";
import {ILoginReturnProps} from "../pages/Login/types/interface";
import {AxiosPromise} from "axios";
//@ts-ignore
const baseUrl: string = window.urlConfig.baseUrl;


/**
 * 登录方法
 * @param reqBody
 */
export const czLogin = (reqBody: ILoginProps): any => {
    return czHttp.post(`${baseUrl}/auth-service/account/login`, JSON.stringify(reqBody));
};

/**
 * 注册方法
 * @param reqBody
 */
export const czRegister = (reqBody: IRegisterProps): any => czHttp.post(`${baseUrl}/auth-service/account/register`, JSON.stringify(reqBody));