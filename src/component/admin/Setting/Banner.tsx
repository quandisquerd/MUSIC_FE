import { Button, Skeleton, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useGetAllBannerQuery } from "../../../api/banner";
import AudioPlayer from "./AudioPlayer";
import {
  CustomerServiceOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SelectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import EditBanner from "./EditBanner";
import { useState } from "react";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Banner = ({users}:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const showModal = (record: DataType) => {
    setSelectedRecord(record); // Lưu record khi nhấn vào
    setIsModalOpen(true); // Mở modal
  };
  const status = (status: any) => {
    setIsModalOpen(status);
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (text) => (
        <a className="font-mono text-blue-400 flex justify-center">{text}</a>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (img: any) => (
        <>
          <img src={img} alt="" className="w-20" />
        </>
      ),
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      align: "center",
      render: (file: any) => (
        <div className="flex justify-center">
          <AudioPlayer src={file} />
        </div>
      ),
    },
    {
      title: "File Name",
      dataIndex: "filename",
      key: "filename",
      align: "center",
      render: (filename: any) => (
        <>
          <p className="text-xs flex items-center">
            <CustomerServiceOutlined className="mr-1" />
            {filename?.name}
          </p>
          <p className="text-xs font-bold flex items-center mt-1">
            <UserOutlined className="mr-1" /> {filename?.author}
          </p>
        </>
      ),
    },
    {
      title: "Status",
      key: "active",
      dataIndex: "active",
      align: "center",
      render: (status: any) => (
        <div className="flex justify-center">
          <Tag color={status ? "green" : "red"}>
            {status ? "ACTIVE" : "UNACTIVE "}
          </Tag>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <>
          <EditBanner
            status={isModalOpen}
            onStatus={status}
            data={selectedRecord}
            users={users}
          />
          <Space size="middle" className="flex justify-center">
            <a
              className="flex items-center text-blue-500"
              onClick={() => showModal(record)}
            >
              <EditOutlined />
              Edit
            </a>
            <a className="flex items-center text-green-500">
              <SelectOutlined />
              View
            </a>
            <a className="flex items-center text-red-500">
              <DeleteOutlined />
              Delete
            </a>
          </Space>
        </>
      ),
    },
  ];
  const { data: bannes, isLoading } = useGetAllBannerQuery("");
  const data: DataType[] = bannes?.data?.map((item: any, index: any) => ({
    key: index + 1,
    id: item?.id,
    title: item?.title,
    image: item?.image,
    active: item?.active,
    file: item?.Music?.file,
    description: item?.description,
    filename: {
      id: item?.Music?.id,
      name: item?.Music?.name,
      author: item?.User?.username,
    },
  }));
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {" "}
          <div className="flex">
            <h1 className="text-3xl mb-3 font-semibold">Setting Banner</h1>
            <Button className="ml-auto flex items-center text-xs border px-4 py-1 rounded border-blue-700 text-white bg-blue-700">
              <PlusOutlined />
              New
            </Button>
          </div>
          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={false}
            className="border"
          />
        </>
      )}
    </>
  );
};

export default Banner;
