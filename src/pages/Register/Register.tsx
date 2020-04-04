import React from "react";
import "./Register.less";
import {Form, Input, Button} from "antd";

const FormItem = Form.Item;

const Register: React.FC = () => {

    const onRegister = (values: any): void => {
        console.log(values)
    };

    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 16},
    };

    return (
        <div className="cz-register">
            <div className="registerWrapper">
                <div className="title">新用户注册</div>
                <Form
                    {...layout}
                    onFinish={onRegister}
                >
                    <FormItem
                        label="用户名"
                        name="userName"
                        rules={[{required: true, message: '请输入用户名!'}]}
                        required={true}
                    >
                        <Input
                            placeholder="用户名"
                        />
                    </FormItem>
                    <FormItem
                        label="密码"
                        name="passWord"
                        rules={[{required: true, message: '请输入密码!'}]}
                        required={true}
                    >
                        <Input
                            type="password"
                            placeholder="密码"
                        />
                    </FormItem>
                    <FormItem
                        label="确认密码"
                        name="confirmPassWord"
                        rules={[{required: true, message: '请再次输入密码!'}]}
                        required={true}
                    >
                        <Input
                            type="password"
                            placeholder="再次输入密码"
                        />
                    </FormItem>
                    <FormItem
                        label="手机号"
                        name="mobile"
                    >
                        <Input
                            placeholder="手机号"
                        />
                    </FormItem>
                    <div style={{textAlign: "center"}}>
                        <Button type="primary" htmlType="submit">注册</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default Register;