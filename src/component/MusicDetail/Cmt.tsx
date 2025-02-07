import { CommentOutlined } from "@ant-design/icons";
import CmtDetail from "./CmtDetail";
import { useParams } from "react-router-dom";
import { useGetCommentWithMusicQuery } from "../../api/musicDetail";
import LoadingDiv from "../loading/LoadingDiv";

const Cmt = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCommentWithMusicQuery(id);

  return (
    <div className="w-5/6  mx-auto p-4  bg-white  mb-20 mt-2">
      {isLoading && <LoadingDiv />}
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
  );
};

export default Cmt;
