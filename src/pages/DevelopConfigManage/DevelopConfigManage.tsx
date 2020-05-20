import React, {useEffect, useMemo, useState, CSSProperties, Fragment} from "react";
import {Tree, Button, Form, InputNumber, Input, Select, Modal, message} from "antd";
import {
    ITreeDataProps,
    ITreeNodeMenuItemProps,
    ITableProps,
    ITableData,
    EditableCellProps,
    ICreateTableModalProps,
    IAllOptionsProps
} from "./types";
import _ from 'lodash';
import "./DevelopConfigManage.less";
import CzTable from "../../components/CzTable/CzTable";
import {TablePaginationConfig} from "antd/es/table";
import {getFiledDataType, getAllTable, getTableAllFieldById} from "../../service/commonApi";
import CzModal from "../../components/CzModal/CzModal";
import CreateTableForm from "./components/CreateTableForm";
import {czArrayRepeatByKey} from "../../utils/CzUtils";
import * as commonApi from "../../service/commonApi";
import {ICreateTableProps} from "../../service/interface";

const {TreeNode} = Tree;
const {Option} = Select;

const EditableCell: React.FC<EditableCellProps> = ({inputNode, editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    return (
        <td {...restProps}>
            {editing ? inputNode : children}
        </td>
    );
};

const DevelopConfigManage: React.FC<any> = () => {
    const [menuTreeData, setMenuTreeData] = useState<Array<ITreeDataProps>>([]);
    const [selectedTreeKeys, setSelectedTreeKeys] = useState<Array<string>>([]);
    const [expandedTreeKeys, setExpandedTreeKeys] = useState<Array<string>>(["table"]);
    const [rightClickTreeNodeMenuItemProps, setRightClickTreeNodeMenuItemProps] = useState<ITreeNodeMenuItemProps>({
        pageX: 0,
        pageY: 0,
        id: "",
        isLeaf: false
    });
    const [editingKey, setEditingKey] = useState<string>('');
    const [tableProps, setTableProps] = useState<ITableProps>({
        dataSource: [] as ITableData[],
        paginationProps: {
            current: 1,
            pageSize: 10,
        },
        loading: false
    });
    const [createTableModalProps, setCreateTableModalProps] = useState<ICreateTableModalProps>({
        title: "新建表",
        visible: false
    });
    const [allOptions, setAllOptions] = useState<IAllOptionsProps>({
        dataTypeOptions: []
    });

    const createTableModalOk = () => {
        setCreateTableModalProps(state => ({
            ...state,
            visible: false
        }))
    };
    const createTableModalCancel = () => {
        setCreateTableModalProps(state => ({
            ...state,
            visible: false
        }))
    };

    const [form] = Form.useForm();

    useEffect(() => {
        getAllDataTypeOptions();
        getAllTableData();
    }, []);

    const getAllTableData = async (): Promise<void> => {
        const value = await getAllTable();
        console.log(value, '菜单数据源')
        const menuData = value.map((item: any) => ({
            key: item.id,
            title: item.name,
            tableName: item.tableName
        }));
        const newMenuData = czArrayRepeatByKey(menuData, 'key');
        const data: Array<ITreeDataProps> = [
            {
                title: '表',
                key: "table",
                children: newMenuData
            }
        ];
        setMenuTreeData(data);
    };


    /**
     * 获取字段所有数据类型
     */
    const getAllDataTypeOptions = async (): Promise<void> => {
        const data = await getFiledDataType();
        setAllOptions(state => ({
            ...state,
            dataTypeOptions: data
        }))
    };

    /**
     * 树节点选中事件
     * @param selectedKeys
     * @param info
     */
    const onSelect = async (selectedKeys: Array<any>, info: any): Promise<void> => {
        try {
            if (selectedKeys.length === 0) {
                setSelectedTreeKeys(selectedKeys);
                setTableProps(state => ({
                    ...state,
                    dataSource: [] as ITableData[]
                }));
                return
            }

            setTableProps(state => ({
                ...state,
                loading: true,
            }))
            setSelectedTreeKeys(selectedKeys);
            const res = await getTableAllFieldById(selectedKeys[0]);

            if (res) {
                const tableData: ITableData[] = res.map((item: any, index: number) => ({
                    ...item,
                    dataType: allOptions.dataTypeOptions.filter(item0 => item0.value === item.dataType)[0].label,
                    isNull: item.isNull === "NULL" ? '是' : '否',
                    index: index + 1,
                    key: (index + 1).toString()
                }));
                setTableProps(state => ({
                    ...state,
                    dataSource: tableData,
                    loading: false
                }))
            }
        } catch (e) {
            console.error(e, '获取表字段方法')
        }
    };

    /**
     * 树节点展开事件
     * @param expandedKeys
     */
    const onExpand = (expandedKeys: any[]): void => {
        setExpandedTreeKeys(expandedKeys);
    };

    /**
     * 获取树节点
     */
    const handleGetTreeNode = (data: Array<ITreeDataProps>): Array<React.ReactNode> => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={item.title}>
                        {handleGetTreeNode(item.children)}
                    </TreeNode>
                )
            }
            return (
                <TreeNode key={item.key} title={item.title}/>
            )
        })
    };

    /**
     * 渲染树节点
     */
    const renderTreeNode = useMemo<Array<React.ReactNode>>(() => {
        return handleGetTreeNode(menuTreeData);
    }, [menuTreeData]);

    const onRightClick = (e: any): void => {
        console.log(e.event.pageY)
        if (e.node.children) { // 说明是非叶子节点
            setRightClickTreeNodeMenuItemProps(state => ({
                ...state,
                pageX: e.event.pageX,
                pageY: e.event.pageY - 50,
                id: e.node.key,
                isLeaf: false
            }))
        } else { // 说明是叶子节点
            setRightClickTreeNodeMenuItemProps(state => ({
                ...state,
                pageX: e.event.pageX,
                pageY: e.event.pageY - 50,
                id: e.node.key,
                isLeaf: true
            }))
        }
    };

    /**
     * 创建表
     */
    const createTable = () => {
        clearRightMenu();
        setCreateTableModalProps(state => ({
            ...state,
            visible: true
        }))
    };

    /**
     * 删除表
     * @param tableId 表的ID
     */
    const deleteTable = (tableId: string) => {
        console.log("删除表", tableId)
    };

    const getNodeTreeRightClickMenu = useMemo<React.ReactNode>((): React.ReactNode => {
        const {pageX, pageY, id, isLeaf} = rightClickTreeNodeMenuItemProps;
        const tmpStyle = {
            left: `${pageX - 6}px`,
            top: `${pageY - 16}px`
        } as CSSProperties;
        const menu = (
            <div style={tmpStyle} className="czTreeNode-right-menu" onClick={e => {
                e.stopPropagation()
            }}>
                {
                    isLeaf === true ?
                        <div className="czTreeNode-right-menu-item" onClick={() => {
                            deleteTable(id)
                        }}>删除表</div>
                        :
                        <div className="czTreeNode-right-menu-item" onClick={() => {
                            createTable()
                        }}>新建表</div>
                }
            </div>
        );
        return rightClickTreeNodeMenuItemProps.id ? menu : null;
    }, [rightClickTreeNodeMenuItemProps]);

    /**
     * 清除右键菜单
     */
    const clearRightMenu = (): void => {
        setRightClickTreeNodeMenuItemProps(state => ({
            ...state,
            id: ""
        }));
    };

    /**
     * 分页的onChange事件
     * @param page 当前是第几页
     * @param pageSize 每页显示多少条
     */
    const pageOnChange = (page: number, pageSize: number): void => {
        setTableProps(state => ({
            ...state,
            paginationProps: {
                ...state.paginationProps,
                current: page,
                pageSize: pageSize
            },
            loading: true
        }))
    };

    /**
     * 每页显示多少条数据变化事件
     * @param current
     * @param size
     */
    const onShowSizeChange = (current: number, size: number): void => {
        setTableProps(state => ({
            ...state,
            paginationProps: {
                ...state.paginationProps,
                pageSize: size
            },
            loading: true
        }))
    };

    /**
     * 获取表格数据源
     */
    const handleGetTableData = (): void => {
        const dataArr: ITableData[] = [];
        for (let i = 0; i < 1; i++) {
            dataArr.push({
                fieldName: "name",
                dataType: "字符串",
                length: 255,
                isNull: "是",
                remark: "哈哈哈哈",
                key: (i + 1).toString(),
                index: i + 1,
            })
        }
        setTableProps(state => ({
            ...state,
            dataSource: dataArr,
            loading: false
        }))
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         handleGetTableData();
    //     }, 1000)
    // }, [tableProps.paginationProps]);

    /**
     * 行是否处于编辑状态
     * @param record
     */
    const isEditing = (record: ITableData): boolean => {
        return record.key === editingKey;
    };

    /**
     * 编辑字段
     * @param record
     */
    const editRow = (record: ITableData): void => {
        console.log(record)
        form.setFieldsValue({...record});
        setEditingKey(record.key);
    };

    /**
     * 保存按钮
     * @param key
     */
    const saveRow = async (key: React.Key): Promise<void> => {
        try {
            const row = (await form.validateFields()) as ITableData;

            console.log(row, '保存的行数据')

            const newData = [...tableProps.dataSource];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) { // 替换
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setTableProps(state => ({
                    ...state,
                    dataSource: newData
                }))
                setEditingKey('');
            } else { //新增
                newData.push(row);
                setTableProps(state => ({
                    ...state,
                    dataSource: newData
                }))
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            dataIndex: "index",
            title: "序号",
            width: 80,
        },
        {
            dataIndex: 'fieldName',
            title: '字段名',
            width: 160,
            editable: true,
            inputNode: (
                <Form.Item
                    name="fieldName"
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `请输入字段名!`,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            )
        },
        {
            dataIndex: "dataType",
            title: "字段类型",
            width: 160,
            editable: true,
            inputNode: (
                <Form.Item
                    name="dataType"
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `请选择字段类型!`,
                        },
                    ]}
                >
                    <Select>
                        {
                            allOptions.dataTypeOptions.map(item => (
                                <Option key={item.value} value={item.label}>{item.label}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            )
        },
        {
            dataIndex: "length",
            title: "字段长度",
            width: 160,
            editable: true,
            inputNode: (
                <Form.Item
                    name="length"
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `请输入字段长度!`,
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>
            )
        },
        {
            dataIndex: "isNull",
            title: "是否为空",
            width: 160,
            editable: true,
            inputNode: (
                <Form.Item
                    name="isNull"
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `请选择是否为空!`,
                        },
                    ]}
                >
                    <Select>
                        <Option value="否">否</Option>
                        <Option value="是">是</Option>
                    </Select>
                </Form.Item>
            )
        },
        {
            dataIndex: "remark",
            title: "字段描述",
            width: 160,
            editable: true,
            inputNode: (
                <Form.Item
                    name="remark"
                    style={{margin: 0}}
                >
                    <Input allowClear={true} placeholder="请输入字段描述（选填）"/>
                </Form.Item>
            )
        },
        {
            dataIndex: "operation",
            title: "操作",
            render: (_: any, record: ITableData) => {
                const editable: boolean = isEditing(record);
                return editable ?
                    <Fragment>
                        <Button type="primary" onClick={() => {
                            saveRow(record.key)
                        }}>保存</Button>
                        <Button type="link" onClick={() => {
                            cancelField(record)
                        }}>取消</Button>
                    </Fragment>
                    :
                    <Fragment>
                        <Button onClick={() => {
                            editRow(record)
                        }}>编辑</Button>
                        <Button danger={true} type="link" onClick={() => {
                            deleteField(record)
                        }}>删除</Button>
                    </Fragment>
            }
        }
    ];

    /**
     * 合并列配置
     */
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: ITableData) => ({
                record,
                inputNode: col.inputNode,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    /**
     * 取消
     */
    const cancelField = (record: any): void => {
        if (record.id) {//说明是编辑，取消恢复原来的值即可
            setTableProps(state => ({
                ...state,
            }))
        } else { // 说明是新增的字段，取消删除该字段即可
            const tableData = tableProps.dataSource.filter(item => item.index !== record.index);
            setTableProps(state => ({
                ...state,
                dataSource: tableData
            }))
        }
        setEditingKey("")
    };

    /**
     * 删除字段
     * @param record
     */
    const deleteField = (record: any): void => {
        console.log(record)
        Modal.confirm({
            title: '系统提示',
            centered: true,
            content: '确定要删除么？',
            onOk: () => {
                const newData = [...tableProps.dataSource];
                const data = newData.filter(item => item.key !== record.key).map((item, index) => ({
                    ...item,
                    index: index + 1
                }));
                setTableProps(state => ({
                    ...state,
                    dataSource: data
                }))
            },
            onCancel: () => {

            }
        });
    };

    /**
     * 新增字段
     */
    const addField = (): void => {
        const newData: ITableData[] = [...tableProps.dataSource];
        const addData: ITableData = {
            index: tableProps.dataSource.length + 1,
            fieldName: "",
            dataType: "字符串",
            length: 255,
            isNull: "是",
            remark: "",
            key: (tableProps.dataSource.length + 1).toString()
        };
        newData.push(addData);
        setTableProps(state => ({
            ...state,
            dataSource: newData
        }));
        editRow(addData); // 新增之后立刻编辑新增的字段
    };

    /**
     * 匹配数据类型
     * @param value
     */
    const matchDataType = (value: string): string => {
        const data = allOptions.dataTypeOptions.filter(item => item.label === value);
        return data[0].value;
    };

    /**
     * 配置是否为空字段
     * @param value
     */
    const matchIsNull = (value: string): string => {
        return value === "是" ? "NULL" : "NOT NULL";
    };

    /**
     * 保存表
     */
    const saveField = _.debounce(async () => {
        // @ts-ignore
        const selectedTable: any = menuTreeData[0].children.filter(item => item.key === Number(selectedTreeKeys[0]));
        const tableData = tableProps.dataSource.map(item => ({
            ...item,
            dataType: matchDataType(item.dataType),
            isNull: matchIsNull(item.isNull),
        }));

        for (let i = 0; i < tableData.length; i++) {
            delete tableData[i].key;
            delete tableData[i].index;
        }
        console.log(tableData)
        const reqBody: ICreateTableProps = {
            sysTable: {
                name: selectedTable[0].title,
                tableName: selectedTable[0].tableName,
                id: Number(selectedTable[0].key)
            },
            sysTableFieldList: tableData
        };
        console.log(reqBody);
        const result = await commonApi.createTable(reqBody);
        console.log("返回的结果", result)
        if (result) {
            message.success("保存成功");
            onSelect(selectedTreeKeys, {})
        } else {
            message.error('保存失败')
        }
    }, 3000, {leading: true, trailing: false});

    return (
        <div className="cz-developConfigManage clearfix">
            <div className="left-content fl" onClick={clearRightMenu}>
                {
                    menuTreeData.length > 0 ?
                        <Tree
                            selectedKeys={selectedTreeKeys}
                            expandedKeys={expandedTreeKeys}
                            onExpand={onExpand}
                            onSelect={onSelect}
                            onRightClick={onRightClick}
                        >
                            {renderTreeNode}
                        </Tree>
                        :
                        "正在加载中..."
                }
                {getNodeTreeRightClickMenu}
            </div>
            <div className="right-content fr">
                {
                    selectedTreeKeys.length > 0 ?
                        <Fragment>
                            <div className="operateArea">
                                <Button disabled={tableProps.dataSource.length > 0 && !editingKey ? false : true}
                                        type="primary"
                                        onClick={saveField}>保存</Button>
                            </div>
                            <div className="tableWrapper">
                                <Form form={form} component={false}>
                                    <CzTable
                                        columns={mergedColumns}
                                        dataSource={tableProps.dataSource}
                                        // pagination={{
                                        //     current: tableProps.paginationProps.current,
                                        //     pageSize: tableProps.paginationProps.pageSize,
                                        //     onChange: pageOnChange,
                                        //     onShowSizeChange: onShowSizeChange,
                                        // } as TablePaginationConfig}
                                        pagination={false}
                                        loading={tableProps.loading}
                                        components={{
                                            body: {
                                                cell: EditableCell,
                                            },
                                        }}
                                        scroll={{
                                            x: 'max-content',
                                            y: 700,
                                        }}
                                        rowKey={(record: ITableData): string => record.fieldName}
                                    />
                                </Form>
                            </div>
                            <div className="addField">
                                <Button disabled={editingKey ? true : false} onClick={addField}>新增字段</Button>
                            </div>
                        </Fragment>
                        :
                        <div className="right-content-tips">请先选择一个表再进行配置</div>
                }
            </div>
            <CzModal
                title={createTableModalProps.title}
                visible={createTableModalProps.visible}
                onCancel={createTableModalCancel}
                onOk={createTableModalOk}
                footer={null}
            >
                <CreateTableForm
                    closeModal={createTableModalCancel}
                    getAllTableData={getAllTableData}
                />
            </CzModal>
        </div>
    )
};

export default DevelopConfigManage;