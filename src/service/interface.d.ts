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