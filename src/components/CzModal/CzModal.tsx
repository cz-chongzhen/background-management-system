import React from "react";
import "./CzModal.less";
import DragM from "dragm";
import {Modal} from 'antd';

interface ICzModalProp {
    title: string,
    visible: boolean,
    width?: number,
    onCancel: () => void,
    onOk: () => void,
    footer?: React.ReactNode | null,
    mask?: boolean,
    bodyStyle?: any,
    className?: string,
}

let modalDom: any;

const CzModal: React.FC<ICzModalProp> = (props) => {

    const {
        title,
        visible,
        width,
        onCancel,
        onOk,
        footer,
        mask,
        bodyStyle,
        className,
    } = props;

    /**
     * 弹框的拖动事件
     * @param transformStr
     */
    const updateTransform = (transformStr: string): void => {
        modalDom = document.getElementsByClassName("ant-modal-wrap")[0] as HTMLElement;
        modalDom.style.transform = transformStr;
    };

    /**
     * 弹框关闭的回调事件
     */
    const afterClose = () => {
        if (!modalDom)
            return;
        modalDom.style.transform = "translate(0px,0px)";
    };

    const titleDrag: React.ReactElement = (
        <DragM updateTransform={updateTransform}>
            <div>{title}</div>
        </DragM>
    );

    return (
        <div className="cz-czModal">
            <Modal
                visible={visible}
                centered={true}
                title={titleDrag}
                width={width ? width : 520}
                destroyOnClose={true}
                onCancel={onCancel}
                onOk={onOk}
                afterClose={afterClose}
                footer={footer}
                mask={mask === false ? false : true}
                maskClosable={false}
                bodyStyle={bodyStyle ? bodyStyle : {}}
                wrapClassName={className ? className : ''}
            >
                {props.children}
            </Modal>
        </div>
    )
};

export default CzModal;