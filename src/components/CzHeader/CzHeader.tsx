import React from 'react';
import "./CzHeader.less";
import {useHistory} from "react-router-dom";

const CzHeader: React.FC = () => {
    const history = useHistory();
    return (
        <header className="cz-czHeader">
            <div className="header-left">
                <div className="logoWrapper"></div>
                <div className="organization" onClick={()=>{history.push('/basic')}}>崇臻智能科技有限公司</div>
            </div>
            <div className="header-right">

            </div>
        </header>
    )
};

export default CzHeader;