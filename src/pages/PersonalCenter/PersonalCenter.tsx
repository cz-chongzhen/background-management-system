import React, {useContext, useEffect} from "react";
import "./PersonalCenter.less";
import {AppContext} from "../../index";

const PersonalCenter: React.FC = () => {

    const [state] = useContext(AppContext);
    useEffect(() => {
        console.log(state,'阿较高的抗')
    }, []);
    return (
        <div className="cz-personalCenter">
            <div>用户名：{state.userInfo?.userName}</div>
            <div>手机号：{state.userInfo?.mobile}</div>
        </div>
    )
};

export default PersonalCenter;