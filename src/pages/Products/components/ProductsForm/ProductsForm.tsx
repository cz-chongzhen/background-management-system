import React from "react";
import "./ProductsForm.less";
import {Form, Input, InputNumber, Upload, Button, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import * as commonApi from "../../../../service/commonApi";
import {ICreateDataProps} from "../../../../service/interface";
import _ from "lodash";

interface IProps {
    modalOnOk: () => void
}

const {Item, useForm} = Form;
const uploadUrl = (window as any).urlConfig.uploadUrl;
const ProductsForm: React.FC<IProps> = (props) => {
    const [form] = useForm();
    const onFinish = _.debounce(async (values: any): Promise<void> => {
        console.log(values)
        const reqBody: ICreateDataProps = {
            tableName: 'products',
            updateList: [{name: values.name, price: values.price}]
        };
        const result = await commonApi.commonCreateData(reqBody);
        if (result) {
            message.success('新增成功');
            props.modalOnOk();
        }
    }, 3000, {
        leading: true,
        trailing: false
    });

    return (
        <div className="cz-productsForm">
            <Form
                scrollToFirstError={true}
                onFinish={onFinish}
                form={form}
            >
                <Item
                    label="产品名称"
                    name="name"
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: '产品名称必填'
                        }
                    ]}
                    validateFirst={true}
                >
                    <Input placeholder="请输入产品名称"/>
                </Item>
                <Item
                    label="产品价格"
                    name="price"
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: '产品价格必填'
                        }
                    ]}
                    validateFirst={true}
                >
                    <InputNumber style={{width: '100%'}} placeholder="请输入产品价格"/>
                </Item>
                <Item
                    label="产品图片"
                    name="image"
                    required={false}
                    rules={[
                        {
                            required: false,
                            message: '产品图片必填'
                        }
                    ]}
                    validateFirst={true}
                >
                    <Upload
                        action={`${uploadUrl}/fileUpload`}
                        data={(obj) => {
                            console.log(obj)
                        }}
                        fileList={[]}
                        headers={{
                            access_token: window.sessionStorage.getItem("access_token") as string
                        }}
                        listType="picture"
                    >
                        <Button><UploadOutlined/>点击上传</Button>
                    </Upload>
                </Item>
                <Item style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">确定</Button>
                </Item>
            </Form>
        </div>
    )
};

export default ProductsForm;