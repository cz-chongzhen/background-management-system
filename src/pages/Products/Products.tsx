import React, {Fragment, useEffect, useState} from "react";
import "./Products.less";
import CzTable from "../../components/CzTable/CzTable";
import {IProductsTableProps, IProductsFormModalProps} from "./types";
import ProductsForm from "./components/ProductsForm/ProductsForm";
import CzModal from "../../components/CzModal/CzModal";
import {Button} from "antd";
import * as commonApi from "../../service/commonApi";
import {IQueryProps} from "../../service/interface";

const Products: React.FC = () => {
    const [tableProps, setTableProps] = useState<IProductsTableProps>({
        columns: [
            {
                dataIndex: "index",
                title: "序号",
                width: 80,
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
                fixed:'right',
                align:"center",
                width: 140,
                render: () => {
                    return (
                        <Fragment>
                            <Button>编辑</Button>
                            <Button>删除</Button>
                        </Fragment>
                    )
                }
            },


        ],
        dataSource: [],
        paginationProps: {
            current: 1,
            pageSize: 10,
        },
        loading: true,
        selectedRowKeys: [],

    });
    const [productsFormModalProps, setProductsFormModalProps] = useState<IProductsFormModalProps>({
        title: '新增产品',
        visible: false,
    });

    useEffect((): void => {
        getTableData();
    }, []);

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
            visible: true
        }))
    };

    /**
     * 删除
     */
    const remove = async (): Promise<void> => {

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
                    pagination={tableProps.paginationProps}
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

                />
            </CzModal>
        </div>
    )
};

export default Products;