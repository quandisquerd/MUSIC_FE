import { useDispatch, useSelector } from "react-redux";
import Waveform from "../../util/waveform";
import { useParams } from "react-router-dom";
import { useGetOneMusicQuery } from "../../api/music";
import { useEffect } from "react";
import { playSong } from "../../slice/playerSlice";
import Action from "../../component/MusicDetail/Action";

import LoadingCmt from "../../component/loading/LoadingCmt";

const MusicDetail = ({ user, users }: any) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: musicdetail, isLoading: musicing } = useGetOneMusicQuery(id);
  const { currentSong, isPlaying } = useSelector((state: any) => state?.player);
  useEffect(() => {
    if (currentSong) {
      if (musicdetail?.data) {
      }
    } else {
      dispatch(playSong(musicdetail?.data));
    }
  }, [currentSong, musicdetail?.data, dispatch]);

  return (
    <>
      {musicing && <LoadingCmt />}
      <div className="mr-32 ml-32 select-none">
        <div className=" mt-12 max-w-full text-xs font-bold bg-white text-white  items-center justify-center">
          <Waveform isPlaying={isPlaying} />
        </div>
        <Action user={user} users={users} data={musicdetail?.data} />
      </div>
    </>
  );
};

export default MusicDetail;
