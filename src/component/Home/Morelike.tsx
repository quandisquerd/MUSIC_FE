import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllHistoryWithUserQuery } from "../../api/music";
import { useDispatch } from "react-redux";
import { setPlaylist } from "../../slice/playerSlice";
import SongItem from "./SongItem";
import LoadingDiv from "../loading/LoadingDiv";

const Morelike = ({ user }: any) => {
  const dispatch = useDispatch();
  const { data: listenhistory, isLoading } = useGetAllHistoryWithUserQuery(
    user?.token
  );
  useEffect(() => {
    if (listenhistory?.data) {
      dispatch(setPlaylist(listenhistory?.data));
    }
  }, [listenhistory?.data, dispatch]);

  return (
    <>
      <div className=" mt-10 flex items-center select-none">
        <h2 className="text-xl font-semibold mb-4 ">More of what you like</h2>
        <Link to="test" className="ml-auto">
          see all
        </Link>
      </div>
      {isLoading && <LoadingDiv />}
      <div className="grid grid-cols-4 gap-4">
        {listenhistory?.data?.map((item: any) => {
          return <SongItem item={item} key={item?.id} user={user} />;
        })}
      </div>
    </>
  );
};

export default Morelike;
