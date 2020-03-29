import React, {useState} from "react";
import {Button} from "antd";
import CzModal from "../../components/CzModal/CzModal";

const Home: React.FC<{}> = () => {

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


    return (
        <div className="cz-czHome">
            <Button onClick={() => {
                setModalProps(state => ({
                    ...state,
                    visible: true
                }))
            }}>点击</Button>
            <CzModal
                title="系统提示"
                visible={modalProps.visible}
                onOk={modalProps.onOk}
                onCancel={modalProps.onCancel}
            >
                <div>
                    <div>惠思雨</div>
                </div>
            </CzModal>
        </div>
    )
};

export default Home;