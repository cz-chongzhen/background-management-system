import {ColumnProps, TablePaginationConfig} from 'antd/es/table';

export interface ITableDataProps {
    index: number;
    id: number;
    name: string;
    createDateTime: string;
    creator: number;
    editDateTime: string;
    price: number;
    image: string;
    editor: number;
}

export interface IProductsTableProps {
    columns: ColumnProps[];
    dataSource: ITableDataProps[];
    paginationProps: boolean;
    loading: boolean;
    selectedRowKeys?: number[];

}

export interface IProductsFormModalProps {
    title: string;
    visible: boolean;
    data: ITableDataProps;
}