import {ColumnProps} from 'antd/es/table';
import {TablePaginationConfig} from "antd/es/table";
import React from "react";

export interface ITreeDataProps {
    title: string;
    key: any;
    children?: ITreeDataProps[]
}

export interface ITreeNodeMenuItemProps {
    pageX: number;
    pageY: number;
    id: string;
    isLeaf: boolean;
}

export interface ITableData {
    index: number;
    fieldName: string;
    dataType: string;
    length: number;
    isNull: string;
    remark: string;
    key: string
}

export interface ITableProps {
    // columns: Array<ColumnProps>;
    dataSource: Array<ITableData>;
    paginationProps: TablePaginationConfig;
    loading: boolean;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'select';
    record: ITableData;
    index: number;
    children: React.ReactNode;
    inputNode: React.ReactNode;
}

export interface ICreateTableModalProps {
    title: string;
    visible: boolean;
}

export interface ICreateTableFormProps {
    closeModal: () => void,
    getAllTableData: () => void,
}

export interface IOptions {
    value: string;
    label: string;
}

export interface IAllOptionsProps {
    dataTypeOptions: IOptions[]
}