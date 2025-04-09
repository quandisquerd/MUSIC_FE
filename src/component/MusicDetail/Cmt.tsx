import { CommentOutlined, LoadingOutlined } from "@ant-design/icons";
import CmtDetail from "./CmtDetail";
import { useParams } from "react-router-dom";
import { useGetCommentWithMusicQuery } from "../../api/musicDetail";
import { Spin } from "antd";

const Cmt = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCommentWithMusicQuery(id);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-10 top-2/3 right-60 flex justify-center items-center ">
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="text-gray-400"
          />
        </div>
      )}
      <div className="w-5/6  mx-auto p-4  bg-white  mb-20 mt-2">
        <span className="flex items-center justify-center">
          <p className="mr-auto text-xl flex justify-center items-center">
            <CommentOutlined className="mr-1" /> {data?.data?.length} comments
          </p>
        </span>
        <hr />
        {data?.data?.map((item: any) => {
          return <CmtDetail key={item?.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Cmt;
