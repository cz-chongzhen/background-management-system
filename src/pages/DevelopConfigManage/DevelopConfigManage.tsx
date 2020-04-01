import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Tree, Button} from "antd";
import {Item, Menu, MenuProvider} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css';
import {ITreeDataProps} from "./types";

const {TreeNode} = Tree;

const DevelopConfigManage: React.FC<any> = () => {

    const [menuTreeData, setMenuTreeData] = useState<Array<ITreeDataProps>>([]);
    const [selectedTreeKeys, setSelectedTreeKeys] = useState<Array<string>>([]);
    const [expandedTreeKeys, setExpandedTreeKeys] = useState<Array<string>>([]);

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

    return (
        <div className="cz-developConfigManage">
            <div className="left-content">
                {
                    menuTreeData.length > 0 ?
                        <Tree
                            selectedKeys={selectedTreeKeys}
                            expandedKeys={expandedTreeKeys}
                            onExpand={onExpand}
                            onSelect={onSelect}
                            onRightClick={() => {
                            }}
                        >
                            {renderTreeNode}
                        </Tree>
                        :
                        "正在加载中..."
                }
            </div>
            <div className="right-content"></div>
        </div>
    )
};

export default DevelopConfigManage;