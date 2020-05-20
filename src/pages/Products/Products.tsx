import React, {Fragment, useEffect, useState} from "react";
import "./Products.less";
import CzTable from "../../components/CzTable/CzTable";
import {IProductsTableProps, IProductsFormModalProps, ITableDataProps} from "./types";
import ProductsForm from "./components/ProductsForm/ProductsForm";
import CzModal from "../../components/CzModal/CzModal";
import {Button, message, Modal} from "antd";
import * as commonApi from "../../service/commonApi";
import {IQueryProps} from "../../service/interface";
import {FormOutlined, DeleteOutlined} from "@ant-design/icons/lib";

const Products: React.FC = () => {
    const [tableProps, setTableProps] = useState<IProductsTableProps>({
        columns: [
            {
                dataIndex: "index",
                title: "序号",
                width: 80,
                render: (_: any, record: ITableDataProps, index: number) => index + 1
            },
            {
                dataIndex: "name",
                title: "名称",
                width: 140,
            },
            {
                dataIndex: "price",
                title: "价格",
                width: 120,
            },
            {
                dataIndex: "image",
                title: "图片",
                width: 120,
            },
            {
                dataIndex: "operate",
                title: "操作",
                fixed: 'right',
                align: "center",
                width: 140,
                render: (_: any, record: ITableDataProps, index: number) => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <FormOutlined style={{fontSize: '20px', color: '#49B0ff'}} onClick={() => {
                                editData(record);
                            }}/>
                            <DeleteOutlined style={{fontSize: '20px', color: '#ff4d4f',marginLeft:'10px'}} onClick={() => {
                                deleteData(record);
                            }}/>
                        </div>
                    )
                }
            },


        ],
        dataSource: [],
        paginationProps: true,
        loading: true,
        selectedRowKeys: [],

    });
    const [productsFormModalProps, setProductsFormModalProps] = useState<IProductsFormModalProps>({
        title: '新增产品',
        visible: false,
        data: {} as ITableDataProps
    });

    useEffect((): void => {
        getTableData();
    }, []);

    /**
     * 编辑数据
     * @param record
     */
    const editData = (record: ITableDataProps): void => {
        setProductsFormModalProps(state => ({
            ...state,
            visible: true,
            data: record,
            title: '编辑产品',
        }))
    };

    /**
     * 单个删除数据
     * @param record
     */
    const deleteData = (record: ITableDataProps): void => {
        console.log(record)
        Modal.confirm({
            title: '系统提示',
            content: '确定要删除该条数据么？',
            onOk: async () => {
                const reqBody = {
                    tableName: 'products',
                    deleteList: [
                        {
                            id: record.id
                        }
                    ]
                }
                const data = await commonApi.commonDelete(reqBody);
                if (data) {
                    message.success("删除成功");
                    getTableData();
                }
            }
        })
    };

    const getTableData = async (): Promise<void> => {
        const reqBody: IQueryProps = {
            tableName: 'products'
        };
        const result = await commonApi.commonQuery(reqBody);
        console.log(result, '表格的数据源')
        if (result) {
            setTableProps(state => ({
                ...state,
                dataSource: result,
                loading: false
            }))
        }
    };

    const modalOnOk = (): void => {
        setProductsFormModalProps(state => ({
            ...state,
            visible: false
        }))
        getTableData();
    };

    const modalOnCancel = (): void => {
        setProductsFormModalProps(state => ({
            ...state,
            visible: false
        }))
    };

    /**
     * 新增
     */
    const openModal = (): void => {
        setProductsFormModalProps(state => ({
            ...state,
            visible: true,
            data: {} as ITableDataProps,
            title: '新增产品',
        }))
    };

    /**
     * 删除
     */
    const remove = (): void => {
        Modal.confirm({
            title: '系统提示',
            content: '确定删除选中的数据么？',
            onOk: async (): Promise<void> => {
                type deleteProps = {
                    id: number;
                }
                const deleteData = tableProps.selectedRowKeys?.map(item => ({id: item}));

                const data = await commonApi.commonDelete({
                    tableName: 'products',
                    deleteList: deleteData as deleteProps[]
                });
                if (data) {
                    message.success("删除成功");
                    setTableProps(state => ({
                        ...state,
                        selectedRowKeys: []
                    }))
                    getTableData();
                }
            }
        })

    };

    const rowSelectedChange = (selectedRowKeys: any[], selectedRows: any[]): void => {
        setTableProps(state => ({
            ...state,
            selectedRowKeys
        }))
    };

    return (
        <div className="cz-products">
            <div className="cz-products-operate">
                <Button type="primary" onClick={openModal}>新增</Button>
                <Button style={{marginLeft: '10px'}}
                        disabled={tableProps.selectedRowKeys && tableProps.selectedRowKeys.length > 0 ? false : true}
                        type="default"
                        onClick={remove}>删除</Button>
            </div>

            <div className="cz-products-tableWrapper">
                <CzTable
                    columns={tableProps.columns}
                    dataSource={tableProps.dataSource}
                    rowKey={record => record.id}
                    // pagination={tableProps.paginationProps}
                    loading={tableProps.loading}
                    rowSelection={{
                        selectedRowKeys: tableProps.selectedRowKeys,
                        onChange: rowSelectedChange,
                        columnWidth: "60px",
                        fixed: true
                    }}
                />
            </div>
            <CzModal
                title={productsFormModalProps.title}
                visible={productsFormModalProps.visible}
                onOk={modalOnOk}
                onCancel={modalOnCancel}
                footer={null}
            >
                <ProductsForm
                    modalOnOk={modalOnOk}
                    formData={productsFormModalProps.data}
                />
            </CzModal>
        </div>
    )
};

export default Products;