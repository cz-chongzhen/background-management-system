import React, {useState} from "react";
import "./Login.less";
import {Spin, Form, Button, Input} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {czLogin} from "../../service/commonApi";

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
    const onFinish = async (values: any): Promise<void> => {
        const data = await czLogin(values);
        console.log(data, '哈哈哈')
        setSpinProps(state => ({
            ...state,
            spinning: true
        }))
        history.push("/home", {value: "惠思雨"})
    };


    const register = () => {
        history.push("/register")
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
                        <FormItem>
                            <div className="login-title">用户登录</div>
                        </FormItem>
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
                            name="passWord"
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
                            <div className="registerWrapper">
                                <span className="tips">没有账号？</span>
                                <Button type="link" onClick={register}>立即注册</Button>
                            </div>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        </div>
    )
};

export default Login;