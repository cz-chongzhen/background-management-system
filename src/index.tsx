import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import AppRouter from "./routers/AppRouter";


declare const ButtonSizeTypes: ["small", "middle", "large"];
type ButtonSizeType = typeof ButtonSizeTypes[number];

const screenWidth: number = document.documentElement.clientWidth;

const _large = screenWidth >= 1920;

const _middle = screenWidth >= 1660 && screenWidth < 1920;

const _small = screenWidth < 1600;


let buttonSize!: ButtonSizeType;

if (_large) {
    buttonSize = "large";
}
if (_middle) {
    buttonSize = "middle";
}
if (_small) {
    buttonSize = "small";
}


ReactDOM.render(
    <ConfigProvider
        componentSize={buttonSize}
        locale={zhCN}
    >
        <AppRouter/>
    </ConfigProvider>,
    document.getElementById('root'));

