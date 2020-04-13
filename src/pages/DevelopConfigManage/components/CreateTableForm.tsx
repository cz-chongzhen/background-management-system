import React, {useState} from "react";
import {Form, Input, Button, Spin} from "antd";
import {ICreateTableFormProps} from "../types";
import {createTable} from "../../../service/commonApi";

const TextArea = Input.TextArea;
const FormItem = Form.Item;

const CreateTableForm: React.FC<ICreateTableFormProps> = (props) => {
    const {closeModal} = props;
    const [spinProps, setSpinProps] = useState({
        spinning: false,
        tip: "创建中，请稍候..."
    });

    const onFinish = async (values: any): Promise<void> => {
        console.log(values)
        setSpinProps(state => ({
            ...state,
            spinning: true
        }));

        const reqBody = {
            sysTable: {
                name: values.name,
                tableName: values.tableName,
                remark: values.remark,
            }
        };
        const data = await createTable(reqBody);
        console.log(data,'创建表')
        // closeModal();
    };

    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 16},
    };

    return (
        <Spin
            spinning={spinProps.spinning}
            tip={spinProps.tip}
        >
            <Form {...layout} onFinish={onFinish}>
                <FormItem
                    label="表名(中文名)"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入中文表名！"
                        }
                    ]}
                >
                    <Input placeholder="请输入中文表名"/>
                </FormItem>
                <FormItem
                    label="表名(英文名)"
                    name="tableName"
                    rules={[
                        {
                            required: true,
                            message: "请输入英文表名！"
                        }
                    ]}
                >
                    <Input placeholder="请输入英文表名"/>
                </FormItem>
                <FormItem
                    label="备注"
                    name="remark"
                >
                    <TextArea placeholder="请输入备注（选填）"/>
                </FormItem>
                <div style={{textAlign: "center"}}>
                    <Button type="primary" htmlType="submit">确定</Button>
                </div>
            </Form>
        </Spin>
    )
};

export default CreateTableForm;