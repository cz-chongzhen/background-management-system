import React from "react";
import {Route, Switch} from 'react-router-dom';
import CzHeader from "../components/CzHeader/CzHeader";
import Home from "../pages/Home/Home";
import DevelopConfigManage from "../pages/DevelopConfigManage/DevelopConfigManage";
import PersonalCenter from "../pages/PersonalCenter/PersonalCenter";

const BasicRouter: React.FC<any> = () => (
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
        <CzHeader />
        <Switch>
            <Route exact path="/basic" component={Home}/>
            <Route path="/basic/home" component={Home}/>
            <Route path="/basic/developConfigManage" component={DevelopConfigManage}/>
            <Route path="/basic/personalCenter" component={PersonalCenter}/>
        </Switch>
    </div>

);

export default BasicRouter;