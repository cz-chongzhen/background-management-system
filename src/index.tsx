import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import AppRouter from "./routers/AppRouter";
import {initialState, reducer} from "./reducer";


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

export const AppContext: React.Context<any> = React.createContext({});
const {Provider} = AppContext;

const App = () => {
    const store = useReducer(reducer, initialState);
    return (
        <Provider value={store}>
            <ConfigProvider
                componentSize={buttonSize}
                locale={zhCN}
            >
                <AppRouter/>
            </ConfigProvider>
        </Provider>
    )
};


ReactDOM.render(<App/>, document.getElementById('root'));

