import { Button, Input, message } from "antd";
import { useAddGenreMutation } from "../../api/genre";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const AddGenre = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [addGenre, { isLoading: adding }] = useAddGenreMutation();
  const [name, setname] = useState<any>();
  const HandleAdd = () => {
    if (name) {
      addGenre({ name })
        .unwrap()
        .then((res: any) => {
          messageApi.success(res?.message);
          setTimeout(() => {
            navigate("/admin/genre");
          },500);
        })
        .catch((res: any) => {
          messageApi.error(res?.data?.message);
        });
    }
  };
  return (
    <div className="w-2/4">
      {contextHolder}
      <h1 className="text-3xl flex justify-center items-center font-light mb-12">
        Add New Genre
      </h1>
      <div className="flex">
        <Input
          placeholder="Name Genre"
          onChange={(e) => setname(e?.target?.value)}
        />
        <Button
          className="bg-blue-500 text-white ml-3"
          onClick={() => HandleAdd()}
        >
          {adding ? <LoadingOutlined className="text-white" /> : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default AddGenre;
