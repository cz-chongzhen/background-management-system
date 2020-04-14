import React, {useEffect, useMemo, useState, CSSProperties, Fragment} from "react";
import {Tree, Button, Form, InputNumber, Input, Select} from "antd";
import {
    ITreeDataProps,
    ITreeNodeMenuItemProps,
    ITableProps,
    ITableData,
    EditableCellProps,
    ICreateTableModalProps,
    IAllOptionsProps
} from "./types";
import "./DevelopConfigManage.less";
import CzTable from "../../components/CzTable/CzTable";
import {TablePaginationConfig} from "antd/es/table";
import {getFiledDataType, getAllTable, getTableAllFieldById} from "../../service/commonApi";
import CzModal from "../../components/CzModal/CzModal";
import CreateTableForm from "./components/CreateTableForm";
import {czArrayRepeatByKey} from "../../utils/CzUtils";

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
        loading: true
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
        const menuData = value.map((item: any) => ({
            key: item.id,
            title: item.name
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
            setSelectedTreeKeys(selectedKeys);
            const res = await getTableAllFieldById(selectedKeys[0]);
            console.log(res, '返回选中表的所有字段')
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
        if (e.node.children) { // 说明是非叶子节点
            setRightClickTreeNodeMenuItemProps(state => ({
                ...state,
                pageX: e.event.pageX,
                pageY: e.event.pageY,
                id: e.node.key,
                isLeaf: false
            }))
        } else { // 说明是叶子节点
            setRightClickTreeNodeMenuItemProps(state => ({
                ...state,
                pageX: e.event.pageX,
                pageY: e.event.pageY,
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
                fieldName: "id",
                dataType: "varchar",
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

    useEffect(() => {
        setTimeout(() => {
            handleGetTableData();
        }, 1000)
    }, [tableProps.paginationProps]);

    /**
     * 行是否处于编辑状态
     * @param record
     */
    const isEditing = (record: ITableData): boolean => {
        return record.key === editingKey;
    };

    /**
     * 编辑按钮
     * @param record
     */
    const editRow = (record: ITableData) => {
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
                    <Input allowClear={true} placeholder="请输入字段描述（选填"/>
                </Form.Item>
            )
        },
        {
            dataIndex: "operation",
            title: "操作",
            render: (_: any, record: ITableData) => {
                const editable: boolean = isEditing(record);
                return editable ?
                    <Button type="primary" onClick={() => {
                        saveRow(record.key)
                    }}>保存</Button>
                    :
                    <Fragment>
                        <Button onClick={() => {
                            editRow(record)
                        }}>编辑</Button>
                        <Button type="link" onClick={() => {
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

    const deleteField = (record: any): void => {
        console.log(record)
        const newData = [...tableProps.dataSource];
        const data = newData.filter(item => item.key !== record.key);
        setTableProps(state => ({
            ...state,
            dataSource: data
        }))
    };

    const addField = (): void => {
        const newData = [...tableProps.dataSource];
        newData.push({
            index: tableProps.dataSource.length + 1,
            fieldName: "",
            dataType: "字符串",
            length: 255,
            isNull: "是",
            remark: "",
            key: (tableProps.dataSource.length + 1).toString()
        });
        setTableProps(state => ({
            ...state,
            dataSource: newData
        }));
        // setEditingKey((tableProps.dataSource.length + 1).toString());
    };

    const matchDataType = (value: string): string => {
        const data = allOptions.dataTypeOptions.filter(item => item.label === value);
        return data[0].value;
    };
    const matchIsNull = (value: string): string => {
        return value === "是" ? "NULL" : "NOT NULL";
    };

    const saveField = () => {

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
    };

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
                <div className="operateArea">
                    <Button disabled={tableProps.dataSource.length > 0 ? false : true} type="primary"
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
                        />
                    </Form>
                </div>
                <div className="addField">
                    <Button onClick={addField}>新增字段</Button>
                </div>
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