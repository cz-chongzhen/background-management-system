import React from "react";
import "./CzButton.less";
import {Button} from "antd";
import {useMediaQuery} from 'react-responsive';

declare const ButtonHTMLTypes: ["submit", "button", "reset"];
type ButtonHTMLType = typeof ButtonHTMLTypes[number];

declare const ButtonSizeTypes: ["large", "middle", "small", undefined];
type ButtonSizeType = typeof ButtonSizeTypes[number];

declare const ButtonShapeTypes: ["circle", "circle-outline", "round" | undefined];
type ButtonShape = typeof ButtonShapeTypes[number];

declare const ButtonTypes: ["default", "primary", "ghost", "dashed", "danger", "link"];
type ButtonType = typeof ButtonTypes[number];

interface ICzButtonProps {
    disabled?: boolean,
    ghost?: boolean,
    href?: string,
    htmlType?: ButtonHTMLType,
    icon?: React.ReactNode,
    loading?: boolean,
    shape?: ButtonShape,
    size?: ButtonSizeType,
    target?: string,
    type?: ButtonType,
    onClick?: () => void,
    block?: boolean,
    danger?: boolean,
    className?: string
}

const CzButton: React.FC<ICzButtonProps> = (props) => {

    const {
        disabled,
        ghost,
        href,
        htmlType,
        icon,
        loading,
        shape,
        size,
        target,
        type,
        onClick,
        block,
        danger,
        className,
    } = props;

    const _1920 = useMediaQuery({minWidth: 1920});

    const _1600 = useMediaQuery({minWidth: 1600, maxWidth: 1919});

    const _1200 = useMediaQuery({minWidth: 1200, maxWidth: 1559});


    let buttonSize: ButtonSizeType;

    if (size) {
        buttonSize = size;
    } else {
        if (_1920) {
            buttonSize = "large";
        }
        if (_1600) {
            buttonSize = "middle";
        }
        if (_1200) {
            buttonSize = "small";
        }
    }


    return (
        <div className="cz-czButton">
            <Button
                disabled={disabled}
                ghost={ghost}
                href={href}
                htmlType={htmlType}
                icon={icon}
                loading={loading}
                shape={shape}
                size={buttonSize}
                target={target}
                type={type}
                onClick={onClick}
                block={block}
                danger={danger}
                className={className}
            >
                {props.children}
            </Button>
        </div>
    )
};

export default CzButton;