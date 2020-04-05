import {ColumnProps} from 'antd/es/table';
import {TablePaginationConfig} from "antd/es/table";

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
    name: string;
    typeName: string;
    length: number;
    isNull: string;
    remark: string;
    key: number
}

export interface ITableProps {
    columns: Array<ColumnProps<ITableData>>;
    dataSource: Array<ITableData>;
    paginationProps: TablePaginationConfig;
    loading: boolean;
}