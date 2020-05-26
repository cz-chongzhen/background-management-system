import czHttp from "./czHttp";
import {ILoginProps, IRegisterProps, ICreateTableProps, ICreateDataProps, IQueryProps, IDeleteProps} from "./interface";

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
 * 获取当前登录用户信息
 */
export const getLoginUserInfo = (): any => {
    return czHttp.get(`${commonUrl}/common/currentUserInfo`);
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
export const createTable = (reqBody: ICreateTableProps): any => czHttp.post(`${commonUrl}/table/createTable`, JSON.stringify(reqBody));

/**
 * 获取所有的表
 */
export const getAllTable = (): any => czHttp.get(`${commonUrl}/table/queryTables`);

/**
 * 获取表所有的字段通过表的ID
 */
export const getTableAllFieldById = (tableId: number): any => czHttp.get(`${commonUrl}/table/queryTableField/${tableId}`);

/**
 * 通用的新增和修改
 * @param reqBody
 */
export const commonCreateData = (reqBody: ICreateDataProps): any => czHttp.post(`${commonUrl}/common/update`, JSON.stringify(reqBody));

/**
 * 通用的查询方法
 * @param reqBody
 */
export const commonQuery = (reqBody: IQueryProps): any => czHttp.post(`${commonUrl}/common/query`, JSON.stringify(reqBody));

/**
 * 通用的删除方法
 * @param reqBody
 */
export const commonDelete = (reqBody: IDeleteProps): any => czHttp.post(`${commonUrl}/common/delete`, JSON.stringify(reqBody));