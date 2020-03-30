import React, {useState} from "react";
import "./Login.less";
import {Spin, Form, Button, Input} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";

const FormItem = Form.Item;

const Login: React.FC<{}> = () => {

    const history = useHistory();

    const [spinProps, setSpinProps] = useState({
        spinning: false,
        tip: "登录中，请稍候..."
    });

    /**
     * 登录按钮点击事件
     */
    const onFinish = (values: any): void => {
        console.log(values)
        setSpinProps(state => ({
            ...state,
            spinning: true
        }))
        history.push("/home", {value: "惠思雨"})
    };

    return (
        <div className="cz-czLogin">
            <div className="loginWrapper">
                <Spin
                    spinning={spinProps.spinning}
                    tip={spinProps.tip}
                >
                    <Form
                        onFinish={onFinish}
                    >
                        <FormItem
                            name="userName"
                            rules={[{required: true, message: '请输入用户名!'}]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder="用户名"
                            />
                        </FormItem>
                        <FormItem
                            name="password"
                            rules={[{required: true, message: '请输入密码!'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </FormItem>
                        <FormItem>
                            <Button style={{width: "100%"}} type="primary" htmlType="submit">登录</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        </div>
    )
};

export default Login;