import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import "./Home.less";
import {Row, Col} from "antd";

const Home: React.FC<{}> = () => {

    const history = useHistory();
    return (
        <div className="cz-czHome">
            <div className="centerWrapper">
                <Row>
                    <Col span={8}>
                        <div>我的应用</div>
                    </Col>
                    <Col span={8}>
                        <div>个人中心</div>
                    </Col>
                    <Col span={8}>
                        <div onClick={() => {
                            history.push("/developConfigManage")
                        }}>配置管理
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default Home;