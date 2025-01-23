import { useGetTopPlayMusicQuery } from "../../api/music";
import { Link } from "react-router-dom";
import SongItem from "./SongItem";
import { Skeleton } from "antd";
import LoadingDiv from "../loading/LoadingDiv";

const Youlike = ({ user }: any) => {
  const { data, isLoading } = useGetTopPlayMusicQuery("");

  return (
    <div>
      <div className=" mt-10 flex items-center">
        <h2 className="text-xl font-semibold mb-4 ">You may also like</h2>
        <Link to="test" className="ml-auto">
          see all
        </Link>
      </div>
      {isLoading && <LoadingDiv />}

      <div className="grid grid-cols-4 gap-4">
        {data?.data?.map((item: any) => {
          return <SongItem item={item} key={item?.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Youlike;
