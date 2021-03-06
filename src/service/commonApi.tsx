import czHttp from "./czHttp";
import {ILoginProps, IRegisterProps, ICreateTableProps} from "./interface";

const userCenterUrl: string = (window as any).urlConfig.userCenterUrl;
const commonUrl: string = (window as any).urlConfig.commonUrl;

/**
 * 登录方法
 * @param reqBody
 */
export const czLogin = (reqBody: ILoginProps): any => {
    return czHttp.post(`${userCenterUrl}/account/login`, JSON.stringify(reqBody));
};

/**
 * 注册方法
 * @param reqBody
 */
export const czRegister = (reqBody: IRegisterProps): any => czHttp.post(`${userCenterUrl}/account/register`, JSON.stringify(reqBody));

/**
 * 获取字段的所有数据类型
 */
export const getFiledDataType = (): any => czHttp.get(`${commonUrl}/table/queryCommobox`);


/**
 * 创建表
 * @param reqBody
 */
export const createTable = (reqBody: ICreateTableProps): any => czHttp.post(`${commonUrl}/createTable`, JSON.stringify(reqBody));