import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import AppRouter from "./routers/AppRouter";


ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <AppRouter/>
    </ConfigProvider>,
    document.getElementById('root'));

