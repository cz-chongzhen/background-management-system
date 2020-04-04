import czHttp from "./czHttp";
//@ts-ignore
const baseUrl: string = window.urlConfig.baseUrl;

export interface ILoginProps {
    userName: string;
    passWord: string;
}

/**
 * 登录方法
 * @param reqBody
 */
export const czLogin = (reqBody: ILoginProps) => {
    return czHttp.post(`${baseUrl}/account/login`, JSON.stringify(reqBody));
};