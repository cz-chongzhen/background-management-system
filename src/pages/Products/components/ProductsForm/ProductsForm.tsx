import React, {useEffect, useState} from "react";
import "./ProductsForm.less";
import {Form, Input, InputNumber, Upload, Button, message} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import * as commonApi from "../../../../service/commonApi";
import {ICreateDataProps} from "../../../../service/interface";
import _ from "lodash";
import CzModal from "../../../../components/CzModal/CzModal";
import {ITableDataProps} from "../../types";
import dayjs from "dayjs";

interface IProps {
    modalOnOk: () => void;
    formData: ITableDataProps;
}

const {Item, useForm} = Form;
const uploadUrl = (window as any).urlConfig.uploadUrl;
const filePreviewUrl = (window as any).urlConfig.filePreviewUrl;
const ProductsForm: React.FC<IProps> = (props) => {
    const [form] = useForm();
    const [uploadProps, setUploadProps] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [] as any,
    });

    useEffect(() => {
        const keyData = Object.keys(props.formData);
        if (keyData.length > 0) {
            form.setFieldsValue({
                name: props.formData.name,
                price: props.formData.price,
                image: props.formData.image
            });
            const imageArr = props.formData.image?.split(',').map((item: string, index: number) => ({
                uid: `-${index}`,
                name: item,
                status: 'done',
                url: `${filePreviewUrl}/${item}`
            }));
            console.log(imageArr)
            setUploadProps(state => ({
                ...state,
                fileList: imageArr ? imageArr : [] as any
            }))
        }
    }, [])
    const onFinish = _.debounce(async (values: any): Promise<void> => {

        const imageArr = typeof values.image == 'string' ? values.image : values.image.fileList.map((item: any) => item.response ? item.response.appData : item.name);
        const reqBody: ICreateDataProps = {
            tableName: 'products',
            updateList: [
                {
                    ...values,
                    image: typeof values.image == 'string' ? values.image : imageArr.join(','),
                    id: props.formData.id
                }
            ]
        };

        console.log(reqBody,'请求参数')
        const result = await commonApi.commonCreateData(reqBody);

        if (result) {
            message.success('保存成功');
            props.modalOnOk();
        }
    }, 3000, {
        leading: true,
        trailing: false
    });

    const uploadOnChange = (info: any): void => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            console.log(info, '上传的文件');
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
        setUploadProps(state => ({
            ...state,
            fileList: info.fileList
        }))
    };

    const picturePreview = async (file: any) => {
        setUploadProps((state => ({
            ...state,
            previewVisible: true,
            previewImage: file.url || `${filePreviewUrl}/${file.response.appData}`,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })))
    };

    const modalOk = (): void => {

    };

    const modalCancel = (): void => {
        setUploadProps(state => ({
            ...state,
            previewVisible: false
        }))
    };

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
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: '产品图片必填'
                        }
                    ]}
                    validateFirst={true}
                >
                    <Upload
                        action={`${uploadUrl}/fileUpload`}
                        fileList={uploadProps.fileList}
                        headers={{
                            access_token: window.sessionStorage.getItem("access_token") as string
                        }}
                        listType="picture-card"
                        onChange={uploadOnChange}
                        onPreview={picturePreview}
                    >
                        <div>
                            <PlusOutlined style={{marginBottom: '8px'}}/>
                            <div style={{color: '#666'}}>点击上传</div>
                        </div>
                    </Upload>
                </Item>
                <Item style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">确定</Button>
                </Item>
            </Form>

            <CzModal
                visible={uploadProps.previewVisible}
                title={uploadProps.previewTitle}
                onOk={modalOk}
                onCancel={modalCancel}
                footer={null}
            >
                <img style={{width: '100%'}} src={uploadProps.previewImage} alt=""/>
            </CzModal>
        </div>
    )
};

export default ProductsForm;