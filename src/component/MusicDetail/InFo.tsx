import { useSelector } from "react-redux";
import Follow from "../PlaybackStats/Follow";
import Track from "../PlaybackStats/Track";

const InFo = ({ data }: any) => {
  const { currentSong } = useSelector((state: any) => state?.player);
  return (
    <div className="w-1/5 mx-auto p-4 border bg-white   flex items-center justify-center mb-20 mt-2">
      <div className=" mb-4">
        <div className="flex items-center justify-center ">
          <img
            className="w-32 h-32 rounded-full"
            src={
              currentSong?.User?.avatar
                ? currentSong?.User?.avatar
                : "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
            }
            alt="User avatar"
          />
        </div>

        <p className="text-sm mt-2 font-light flex items-center justify-center">
          {currentSong?.User?.username}
        </p>
        <div className="flex items-center justify-center">
          <Follow data={data} />
          <Track />
        </div>
        <button className=" border w-full p-2 mt-2 bg-orange-500 text-white">
          Follow
        </button>
      </div>
    </div>
  );
};

export default InFo;
