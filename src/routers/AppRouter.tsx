import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {Login} from "../pages/Login";
import Home from "../pages/Home/Home";
import DevelopConfigManage from "../pages/DevelopConfigManage/DevelopConfigManage";
import PageRouter from "./PageRouter";
import Register from "../pages/Register/Register";
import EchartsDemo from "../pages/EchartsDemo/EchartsDemo";

const AppRouter: React.FC<any> = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/home" component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/developConfigManage" component={DevelopConfigManage}/>
            <Route path="/page" component={PageRouter}/>
            <Route path="/echarts-demo" component={EchartsDemo}/>
        </Switch>
    </BrowserRouter>
);


export default process.env.NODE_ENV === "development" ? hot(AppRouter) : AppRouter