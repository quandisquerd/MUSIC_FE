import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    Skeleton
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom'
import { useGetOneMusicQuery, useUpdateMusicMutation } from '../../api/music';
import axios from 'axios';
import { message } from 'antd';
import { pause } from '../../util/pause';

const Edit: React.FC = () => {
    const [form] = Form.useForm()
    const { id } = useParams()
    const { data, isLoading } = useGetOneMusicQuery(id)
    const [image, setImage] = useState('')
    const [file, setFile] = useState('')
    const [edit] = useUpdateMusicMutation()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])



    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const handleUploadImage = async ({ file }: any) => {
        console.log(file);
        const cloud_name = 'dw6wgytc3';
        const preset_name = 'demo_upload';
        const folder_name = 'NODEJS';
        const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

        const formdata = new FormData();
        formdata.append('upload_preset', preset_name)
        formdata.append('folder', folder_name)

        formdata.append('file', file)
        const response = await axios.post(api, formdata, {

            headers: { "Content-Type": "multipart/form-data" }

        })
        setImage(response.data.secure_url)

    }
    const handleUploadFile = async ({ file }: any) => {
        console.log(file);
        const cloud_name = 'dw6wgytc3';
        const preset_name = 'demo_upload';
        const folder_name = 'NODEJS';
        const api = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;

        const formdata = new FormData();
        formdata.append('upload_preset', preset_name);
        formdata.append('folder', folder_name);
        formdata.append('file', file);

        try {
            const response = await axios.post(api, formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const secureUrl = response.data.secure_url;
            setFile(secureUrl)

            // Do something with the secureUrl, such as saving it to state or sending it to your server
        } catch (error) {
            console.error('Upload error:', error);
        }
    };
    const onFinish = (value: any) => {

        edit({ id: id, name: value.name, image: image, file: file })
            .unwrap()
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã sửa âm thanh thành công!'
                }),
                    await pause(3000)
                navigate('/admin/list')
            })
    }


    return (
        <>
            {contextHolder}
            <h1 style={{ marginBottom: '50px' }}>Sửa Âm Thanh</h1>
            {isLoading ? <Skeleton /> : <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >


                <Form.Item label="Tên Bài Hát"
                    name="name" rules={[{ required: true, message: 'Không được để trống Tên bài hát!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Ảnh Bài Hát" getValueFromEvent={normFile} name="image" >
                    <Upload action="/upload.do" listType="picture-card" customRequest={({ file }) => handleUploadImage({ file })}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="File Bài Hát" getValueFromEvent={normFile} name="file" >
                    <Upload action="/upload.do" listType="picture-card" customRequest={({ file }) => handleUploadFile({ file })}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>File</div>
                        </div>
                    </Upload>
                </Form.Item>
                {image && file ? (
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            SỬA
                        </Button>
                    </Form.Item>
                ) : null}

            </Form>}

        </>
    );
};

export default Edit