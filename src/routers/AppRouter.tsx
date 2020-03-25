import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {Login} from "../pages/Login";
import PageRouter from "./PageRouter";

const AppRouter: React.FC<any> = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/page" component={PageRouter}/>
        </Switch>
    </BrowserRouter>
);


export default process.env.NODE_ENV === "development" ? hot(AppRouter) : AppRouter