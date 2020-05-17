import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {Login} from "../pages/Login";
import PageRouter from "./PageRouter";
import BasicRouter from "./BasicRouter";
import Register from "../pages/Register/Register";
import EchartsDemo from "../pages/EchartsDemo/EchartsDemo";

const AppRouter: React.FC<any> = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/basic" component={BasicRouter}/>
            <Route path="/page" component={PageRouter}/>
            <Route path="/echarts-demo" component={EchartsDemo}/>
            <Redirect from="/*" to="/"/>
        </Switch>
    </BrowserRouter>
);


export default process.env.NODE_ENV === "development" ? hot(AppRouter) : AppRouter