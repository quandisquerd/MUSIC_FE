import { Button, Popconfirm, Table } from "antd";
import { useGetAllGenreQuery, useRemoveGenreMutation } from "../../api/genre";
import LoadingOverlay from "../../component/loading/Loading";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { Link } from "react-router-dom";

const ListGenre = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: genre, isLoading: genreding } = useGetAllGenreQuery("");
  const [remove, { isLoading: removing }] = useRemoveGenreMutation();
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "20%",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: "40%",
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex justify-center items-center ">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="px-4 flex items-center  bg-red-500 mr-4">
              {removing ? (
                <LoadingOutlined className="text-white" />
              ) : (
                <DeleteOutlined className="text-base mb-1 text-white" />
              )}

              <span className="text-white">Remove</span>
            </Button>
          </Popconfirm>
          <Link to={`update/${record?.id}`}>
            <Button className="px-4 flex items-center  bg-blue-500 ">
              <EditOutlined className="text-base mb-1 text-white" />
              <span className="text-white">Update</span>
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  const dataSource = genre?.data?.map((item: any) => ({
    key: item?.id,
    id: `${item?.id}`,
    name: item?.name,
  }));
  const confirm = (e: any) => {
    remove(e)
      .unwrap()
      .then((respon) => {
        messageApi.success(respon?.message);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div w-full>
      {contextHolder}
      {genreding && <LoadingOverlay />}

      <h1 className="text-3xl flex justify-center items-center font-light ">
        List of genres
      </h1>
      <Link to="add">
        <Button className="px-6 flex items-center  bg-green-500 ">
          <PlusOutlined className="text-base mb-1 text-white" />
          <span className="text-white">Add New</span>
        </Button>
      </Link>
      <div className=" mt-12 ">
        <div>
          <Table
            dataSource={dataSource}
            columns={columns}
            className="border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ListGenre;
