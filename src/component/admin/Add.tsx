import { PlusOutlined } from '@ant-design/icons';
import React, {  useState } from 'react';
import {
    Button,
    Form,
    Input,
    Upload,
    Select
} from 'antd';
import {  useNavigate } from 'react-router-dom'
import { useAddMusicMutation} from '../../api/music';
import axios from 'axios';
import { message } from 'antd';
import { pause } from '../../util/pause';
import { useGetAlbumQuery } from '../../api/album';

const Add: React.FC = () => {
    const { data } = useGetAlbumQuery('')

    const [form] = Form.useForm()
    const [image, setImage] = useState('')
    const [file, setFile] = useState('')
    const [add] = useAddMusicMutation()
    const [messageApi, contextHolder] = message.useMessage()
    const [album, setalbum] = useState('')
    const navigate = useNavigate()



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
    const handleAlbum = (e: any) => {
        setalbum(e)
    }
    const onFinish = (value: any) => {

        add({ name: value.name, image: image, file: file, album_id: album })
            .unwrap()
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã thêm âm thanh thành công!'
                }),
                    await pause(3000)
                navigate('/admin/list')
            })
    }


    return (
        <>
            {contextHolder}
            <h1 style={{ marginBottom: '50px' }}>Thêm Âm Thanh</h1>
            <Form
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
                <Form.Item label="Album">
                    <Select onChange={(e: any) => handleAlbum(e)}>
                        {data?.data?.map((data: any) => {
                            return (<>
                                <Select.Option value={data.id} >{data.name}</Select.Option>
                            </>)
                        })}

                    </Select>
                </Form.Item>
                {image && file ? (
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            THÊM
                        </Button>
                    </Form.Item>
                ) : null}

            </Form>

        </>
    );
};

export default Add