export interface ILoginProps {
    userName: string;
    passWord: string;
}

export interface IRegisterProps {
    userName: string;
    passWord: string;
    remark?: string;
    mobile?: string;
}

interface ISysTableProps {
    name: string;
    tableName: string;
    remark?: string;
    id?: number
}

interface ISysTableFieldListProps {
    name?: string;
    fieldName: string;
    dataType: string;
    length: number;
    isNull: string;
    remark?: string;
}

export interface ICreateTableProps {
    sysTable: ISysTableProps;
    sysTableFieldList?: ISysTableFieldListProps[];
}

export interface ICreateDataProps {
    tableName: string;
    updateList: any[];
}

export interface IQueryProps {
    tableName: string;
    columns?: string[];
    conditionColumnsByAnd?: any[];
    conditionColumnsByOr?: any[];
}

type deleteProps = {
    id: number;
}

export interface IDeleteProps {
    tableName: string;
    updateList: deleteProps[]
}