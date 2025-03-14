import { Button, Input, message } from "antd";
import {
  useGetOneGenreQuery,
  useUpdateGenreMutation,
} from "../../api/genre";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingOverlay from "../../component/loading/Loading";

const UpdateGenre = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [updateGenre, { isLoading: updating }] = useUpdateGenreMutation();
  const { data: genre, isLoading } = useGetOneGenreQuery(id);
  const [name, setname] = useState<any>();
  useEffect(() => {
    if (genre?.data?.name) {
      setname(genre.data.name);
    }
  }, [genre]);
  const HandleAdd = () => {
    if (name) {
      updateGenre({ name: { name: name }, id })
        .unwrap()
        .then((res: any) => {
          messageApi.success(res?.message);
          setTimeout(() => {
            navigate("/admin/genre");
          }, 500);
        })
        .catch((res: any) => {
          messageApi.error(res?.data?.message);
        });
    }
  };
  return (
    <div className="w-2/4">
      {contextHolder}
      {isLoading && <LoadingOverlay />}
      <h1 className="text-3xl flex justify-center items-center font-light mb-12">
        Update Genre
      </h1>
      <div className="flex">
        <Input value={name} onChange={(e) => setname(e?.target?.value)} />
        <Button
          className="bg-blue-500 text-white ml-3"
          onClick={() => HandleAdd()}
          disabled={name != genre?.data?.name ? false : true}
        >
          {updating ? <LoadingOutlined className="text-white" /> : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateGenre;
