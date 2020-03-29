import React from "react";
import {Route, Switch} from 'react-router-dom';
import {CzContainer} from "../components/CzContainer";
import Home from "../pages/Home/Home";

const PageRouter: React.FC<any> = () => (
    <CzContainer>
        <Switch>
            <Route exact path="/page" component={Home}/>
            <Route path="/page/home" component={Home}/>
        </Switch>
    </CzContainer>
);

export default PageRouter;