import React from "react";
import {Menu} from "antd";
import "./CzNav.less";

const {SubMenu, Item} = Menu;

interface ICzNavProps {
    menuData: Array<IMenuData>,
    menuSelect: (data: any) => void,
    menuOnOpenChange: (openKeys: string[]) => void,
    openKeys: string[],
    selectedKeys: string[],
}

export interface IMenuData {
    key: string,
    name: string,
    children?: Array<IMenuData>,
    path?:string;
}

const CzNav: React.FC<ICzNavProps> = (props: ICzNavProps) => {

    const {menuData, menuSelect, menuOnOpenChange, openKeys, selectedKeys} = props;

    /**
     * 渲染菜单数据
     */
    const renderMenu = (menuData: Array<IMenuData>): React.ReactNode => {
        return menuData.map(menuItem => {
            if (menuItem.children && menuItem.children.length > 0) {
                return (
                    <SubMenu
                        key={menuItem.key}
                        title={menuItem.name}
                    >
                        {
                            renderMenu(menuItem.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Item key={menuItem.key}>{menuItem.name}</Item>
                )
            }
        })
    };

    return (
        <div className="cz-CzNav">
            <Menu
                mode="inline"
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={menuSelect}
                onOpenChange={menuOnOpenChange}
                inlineCollapsed={false}
            >
                {
                    renderMenu(menuData)
                }
            </Menu>
        </div>
    )
};

export default CzNav;