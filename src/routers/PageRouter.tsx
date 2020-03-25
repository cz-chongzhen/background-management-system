import React from "react";
import {Route, Switch} from 'react-router-dom';
import {CzContainer} from "../components/CzContainer";
import Home from "../pages/Home/Home";

const PageRouter: React.FC<any> = () => (
    <CzContainer>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home}/>
        </Switch>
    </CzContainer>
);

export default PageRouter;