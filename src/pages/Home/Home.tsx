import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import "./Home.less";
import {IHomeMenuProps} from "./types/interface";

const Home: React.FC<{}> = () => {

    const history = useHistory();
    const [menuData] = useState<IHomeMenuProps[]>([
        {
            name: '应用管理',
            path: '/page',
            key: 'applicationManage',
            icon: 'cz-yingyong'
        },
        {
            name: '个人中心',
            path: '/basic/personalCenter',
            key: 'personalCenter',
            icon: 'cz-gerenzhongxin-zhong1'
        },
        {
            name: '配置管理',
            path: '/basic/developConfigManage',
            key: 'developConfigManage',
            icon: 'cz-peizhi'
        }
    ]);

    return (
        <div className="cz-czHome">
            <ul className="cz-czHome-centerWrapper clearfix">
                {
                    menuData.length > 0 ?
                        menuData.map(item => {
                            return (
                                <li key={item.key} className="fl cz-czHome-Item" onClick={() => {
                                    history.push(item.path)
                                }}>
                                    <div className="cz-czHome-wrapper">
                                        <div className="iconWrapper"><i className={`iconfont ${item.icon}`} /></div>
                                        <div className="text">{item.name}</div>
                                    </div>
                                </li>
                            )
                        })
                        :
                        null
                }
            </ul>
        </div>
    )
};

export default Home;