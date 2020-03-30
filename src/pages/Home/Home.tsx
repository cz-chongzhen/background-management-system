import React, {useEffect, useState} from "react";
import {Button} from "antd";
import CzModal from "../../components/CzModal/CzModal";
import {useHistory} from "react-router-dom";
import "./Home.less";

const Home: React.FC<{}> = () => {

    const history = useHistory();

    const handleOk = (): void => {
        setModalProps(state => ({
            ...state,
            visible: false
        }))
    };

    const handleCancel = (): void => {
        setModalProps(state => ({
            ...state,
            visible: false
        }))
    };

    const [modalProps, setModalProps] = useState({
        visible: false,
        onOk: handleOk,
        onCancel: handleCancel
    });

    useEffect(() => {
        console.log(history.location.state, '传过来的参数')
    }, []);

    return (
        <div className="cz-czHome">
            <div className="centerWrapper">
                <div>我的应用</div>
                <div>个人中心</div>
                <div onClick={() => {
                    history.push("/developConfigManage")
                }}>配置管理
                </div>
            </div>
        </div>
    )
};

export default Home;