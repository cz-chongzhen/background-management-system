import React, {useContext, useEffect} from 'react';
import "./CzHeader.less";
import {useHistory} from "react-router-dom";
import * as commonApis from "../../service/commonApi";
import {AppContext} from "../../index";
import * as actionTypes from "../../reducer/actionTypes";

const CzHeader: React.FC = () => {
    const history = useHistory();
    const [state, dispatch] = useContext(AppContext);
    useEffect(() => {
        getLoginUserInfo();
    }, []);

    /**
     * 获取当前登录用户信息
     */
    const getLoginUserInfo = async (): Promise<void> => {
        const data = await commonApis.getLoginUserInfo();
        if (data) {
            dispatch({
                type: actionTypes.getLoginUserInfo,
                data
            })
        }
    };
    return (
        <header className="cz-czHeader">
            <div className="header-left">
                <div className="logoWrapper"></div>
                <div className="organization" onClick={() => {
                    history.push('/basic')
                }}>崇臻智能科技有限公司
                </div>
            </div>
            <div className="header-right">

            </div>
        </header>
    )
};

export default CzHeader;