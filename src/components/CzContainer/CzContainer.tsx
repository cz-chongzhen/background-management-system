import React, {useState, useEffect, useRef} from "react";
import {withRouter} from "react-router-dom";
import "./CzContainer.less";
// import CzSplitPanel from "../CzSplitPanel/CzSplitPanel";
import CzHeader from "../CzHeader/CzHeader";
import {CzNav} from "../CzNav";
import {IMenuData} from "../CzNav/CzNav";
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons/lib";

const CzContainer: React.FC = (props) => {
    const {children} = props;

    // const [menuData, setMenuData] = useState([] as Array<IMenuData>);
    const [navProps, setNavProps] = useState({
        menuData: [] as Array<IMenuData>,
        openKeys: [] as string[],
        selectedKeys: [] as string[]
    });

    const [isCollapse, setIsCollapse] = useState(false);

    const navWrapperDom: any = useRef(null);
    const contentWrapperDom: any = useRef(null);

    useEffect(() => {
        const data: Array<IMenuData> = [
            {
                key: "01",
                name: "组一",
                children: [
                    {
                        key: "010",
                        name: "菜单一",
                    }
                ]
            }
        ];

        setNavProps(state => ({
            ...state,
            menuData: data
        }));
    }, []);

    /**
     * 菜单选中事件
     */
    const menuSelect = (data: any): void => {
        const {selectedKeys} = data;
        setNavProps(state => ({
            ...state,
            selectedKeys
        }))
    };

    /**
     * 菜单展开收起事件
     */
    const menuOnOpenChange = (openKeys: string[]): void => {
        setNavProps(state => ({
            ...state,
            openKeys
        }))
    };

    /**
     * 折叠按钮的点击事件
     */
    const collapseBtnClick = (): void => {
        if (isCollapse) {
            navWrapperDom.current.style.marginLeft = "0";
            contentWrapperDom.current.style.width = "85%";
        } else {
            navWrapperDom.current.style.marginLeft = "-15%";
            contentWrapperDom.current.style.width = "100%";
        }
        setIsCollapse(!isCollapse);
    };

    return (
        <div className="cz-czContainer">
            <CzHeader/>
            <div className="cz-body-wrapper clearfix">
                <div className="cz-leftNavWrapper fl" ref={navWrapperDom}>
                    <CzNav
                        menuData={navProps.menuData}
                        menuSelect={menuSelect}
                        menuOnOpenChange={menuOnOpenChange}
                        openKeys={navProps.openKeys}
                        selectedKeys={navProps.selectedKeys}
                    />
                    <div className="collapseBtn" onClick={collapseBtnClick}>
                        {
                            isCollapse ?
                                <CaretRightOutlined className="collapse_icon"/>
                                :
                                <CaretLeftOutlined className="collapse_icon"/>
                        }
                    </div>
                </div>
                <div className="cz-rightContentWrapper fr" ref={contentWrapperDom}>
                    {children}
                </div>
            </div>


        </div>
    )
};

export default withRouter(CzContainer);