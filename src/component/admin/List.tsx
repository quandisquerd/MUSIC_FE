import { Table, Popconfirm, Button, Skeleton, message } from 'antd'
import {  useGetTopPlayMusicQuery, useRemoveMusicMutation } from '../../api/music';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './list.css'
import { Link } from 'react-router-dom';

const List = () => {
    const { data, isLoading } = useGetTopPlayMusicQuery('')
    const [removeMusic, { isLoading: removeLoading }] = useRemoveMusicMutation()
    const [messageApi, contextHolder] = message.useMessage()
    const [removeloading, setremoveloading] = useState([])


    const remove = (id: any) => {
        setremoveloading((prewMap: any) => ({ ...prewMap, [id]: true }))
        removeMusic(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã xóa thành công!'
                }),
                    setremoveloading((prewMap: any) => ({ ...prewMap, [id]: false }))
            })
    }
    const dataSource = data?.data?.map((music: any) => ({
        key: music.id,
        name: music.name,
        image: music.image,
        file: music.file
    }))

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            width: "10%",
            key: 'key',
        },
        {
            title: 'Name',
            width: "20%",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: "20%",
            render: (image: any) => <img width="20%" src={image} />
        },
        {
            title: 'File',
            dataIndex: 'file',
            width: "30%",
            key: 'file',
            render: (file: any) => {
                return (<>
                    <audio id="musicPlayer" controls>
                        <source
                            src={file}
                            type="audio/mpeg"
                        />
                        Your browser does not support audio playback.
                    </audio>

                </>)
            }
        },
        {
            
            render: (data: any) => {
                return (<>
                    <Popconfirm
                        placement="bottom"
                        title={'Xóa âm thanh'}
                        description={'Bạn có muốn xóa bài hát này không?'}
                        onConfirm={() => remove(data.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>  {removeloading[data.key] && removeLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : "XOA"}</Button>
                    </Popconfirm>
                    <span> </span>
                    <Button type="primary"><Link to={`/admin/list/${data.key}/edit`}>SUA</Link></Button>
                </>)
            }
        }
    ];
    return (
        <>
            {contextHolder}
            <h1><Button><Link to={`/admin/list/add`}>THÊM</Link></Button></h1>
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </>
    )
}

export default List