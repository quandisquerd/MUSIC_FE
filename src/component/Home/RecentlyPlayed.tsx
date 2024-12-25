import { Link } from "react-router-dom";
import { useGetAllHistoryWithUserQuery } from "../../api/music";
import LoadingOverlay from "../loading/Loading";
import { useDispatch } from "react-redux";
import { setPlaylist } from "../../slice/playerSlice";

import SongItem from "./SongItem";
import { useEffect } from "react";

const RecentlyPlayed = ({ user }: any) => {
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
      {isLoading && <LoadingOverlay />}
      <div className=" mt-10 flex items-center">
        <h2 className="text-xl font-semibold mb-4 ">Recently Played</h2>
        <Link to="test" className="ml-auto">
          see all
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {listenhistory?.data?.map((item: any) => {
          return <SongItem item={item} key={item?.id} user={user} />;
        })}
      </div>
    </>
  );
};

export default RecentlyPlayed;
