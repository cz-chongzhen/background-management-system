import React, {useEffect, useMemo, useState, CSSProperties} from "react";
import {Tree, Button, Form, InputNumber, Input} from "antd";
import {ITreeDataProps, ITreeNodeMenuItemProps, ITableProps, ITableData, EditableCellProps} from "./types";
import "./DevelopConfigManage.less";
import CzTable from "../../components/CzTable/CzTable";
import {TablePaginationConfig} from "antd/es/table";

const {TreeNode} = Tree;

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const DevelopConfigManage: React.FC<any> = () => {

    const [menuTreeData, setMenuTreeData] = useState<Array<ITreeDataProps>>([]);
    const [selectedTreeKeys, setSelectedTreeKeys] = useState<Array<string>>([]);
    const [expandedTreeKeys, setExpandedTreeKeys] = useState<Array<string>>([]);
    const [rightClickTreeNodeMenuItemProps, setRightClickTreeNodeMenuItemProps] = useState<ITreeNodeMenuItemProps>({
        pageX: 0,
        pageY: 0,
        id: "",
        isLeaf: false
    });
    const [tableProps, setTableProps] = useState<ITableProps>({
        columns: [
            {
                dataIndex: "index",
                title: "序号",
                width: 80
            },
            {
                dataIndex: 'name',
                title: '字段名',
                width: 160,
                editable: true,
            },
            {
                dataIndex: "typeName",
                title: "字段类型",
                width: 160,
                editable: true,
            },
            {
                dataIndex: "length",
                title: "字段长度",
                width: 160,
                editable: true,
            },
            {
                dataIndex: "isNull",
                title: "是否为空",
                width: 160,
                editable: true,
            },
            {
                dataIndex: "remark",
                title: "字段描述",
                width: 160,
                editable: true,
            },
            {
                dataIndex: "operation",
                title: "操作",
                render: (_: any, record: ITableData) => {
                    const editable = isEditing(record);
                    return editable ?
                        <Button type="primary" onClick={() => {
                            save(record.key)
                        }}>保存</Button>
                        :
                        <Button onClick={() => {
                            edit(record)
                        }}>编辑</Button>
                }
            }
        ],
        dataSource: [],
        paginationProps: {
            current: 1,
            pageSize: 10,
        },
        loading: true
    });

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        const data: Array<ITreeDataProps> = [
            {
                title: '表',
                key: "table",
                children: [
                    {
                        title: 'users',
                        key: 'users',
                    },
                ]
            }
        ];

        setMenuTreeData(data);
    }, []);

    /**
     * 树节点选中事件
     * @param selectedKeys
     * @param info
     */
    const onSelect = (selectedKeys: Array<any>, info: any) => {
        setSelectedTreeKeys(selectedKeys);
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
        console.log("创建表")
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
        for (let i = 0; i < 100; i++) {
            dataArr.push({
                name: "id",
                typeName: "string",
                length: 255,
                isNull: "0",
                remark: "",
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

    const isEditing = (record: ITableData): boolean => record.key === editingKey;

    const edit = (record: ITableData) => {
        form.setFieldsValue({...record});
        setEditingKey(record.key);
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as ITableData;

            const newData = [...tableProps.dataSource];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
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
            } else {
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

    const mergedColumns = tableProps.columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: ITableData) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


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
                <div className="tableWrapper">
                    <Form form={form} component={false}>
                        <CzTable
                            columns={mergedColumns}
                            dataSource={tableProps.dataSource}
                            pagination={{
                                current: tableProps.paginationProps.current,
                                pageSize: tableProps.paginationProps.pageSize,
                                onChange: pageOnChange,
                                onShowSizeChange: onShowSizeChange,
                            } as TablePaginationConfig}
                            loading={tableProps.loading}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default DevelopConfigManage;