import React from "react";
import {Route, Switch} from 'react-router-dom';
import {CzContainer} from "../components/CzContainer";
import EchartsList from "../pages/EchartsList/EchartsList";
import Products from "../pages/Products/Products";
import Order from "../pages/Order/Order";

const PageRouter: React.FC<any> = () => (
    <CzContainer>
        <Switch>
            <Route exact path="/page" component={EchartsList}/>
            <Route path="/page/echartsList" component={EchartsList}/>
            <Route path="/page/products" component={Products}/>
            <Route path="/page/order" component={Order}/>
        </Switch>
    </CzContainer>
);

export default PageRouter;