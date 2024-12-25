import { useDispatch, useSelector } from "react-redux";
import {
  useAddHistorySongMutation,
  useUpdatePlayMusicMutation,
} from "../../api/music";
import { playSong, togglePlayPause } from "../../slice/playerSlice";
import LoadingOverlay from "../loading/Loading";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import Play from "../PlaybackStats/Play";
import Like from "../PlaybackStats/Like";
import Repost from "../PlaybackStats/Repost";

const SongItem = ({ item, user }: any) => {
  const dispatch = useDispatch();
  const [updateplay, { isLoading: updating }] = useUpdatePlayMusicMutation();
  const [addHistorySong, { isLoading: adding }] = useAddHistorySongMutation();
  const { isPlaying, currentSong } = useSelector((state: any) => state?.player);
  const handlePlaySong = async (song: any) => {
    dispatch(playSong(song));
    await updateplay(song?.Music?.id);
    const data = {
      songId: song?.Music?.id,
    };
    await addHistorySong({ data, token: user?.token });
  };
  return (
    <div
      className="bg-white shadow-lg rounded-lg  justify-between h-full overflow-hidden relative group flex flex-col"
      key={item?.id}
    >
      {updating && <LoadingOverlay />}
      {adding && <LoadingOverlay />}
      <img
        src={item?.Music?.image}
        alt="Track 1"
        className="w-full h-36 object-cover"
      />
      <div className="p-4 flex-grow">
        <div>
          <h3 className="font-semibold text-sm">{item?.Music?.name}</h3>
          <p className="text-xs text-gray-500">{item?.User?.username}</p>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-orange-600 mb-20 text-white p-2 rounded-full opacity-75 hover:opacity-100 transform scale-110 hover:scale-125 transition-all z-10">
          {currentSong?.Music?.id === item?.Music?.id ? (
            isPlaying ? (
              <PauseOutlined
                className="w-8 h-8 flex items-center justify-center pl-0.5 text-2xl"
                onClick={() => dispatch(togglePlayPause())}
              />
            ) : (
              <CaretRightOutlined
                className="w-8 h-8 flex items-center justify-center pl-0.5 text-2xl"
                onClick={() => dispatch(togglePlayPause())}
              />
            )
          ) : (
            <CaretRightOutlined
              className="w-8 h-8 flex items-center justify-center pl-0.5 text-2xl"
              onClick={() => handlePlaySong(item)}
            />
          )}
        </button>
      </div>
      <div className="flex items-center justify-center mt-auto pb-4">
        <Play view={item?.Music?.view} />
        <Like favorite={item?.Music?.favorite} />
        <Repost repost={item?.Music?.repost} />
      </div>
    </div>
  );
};

export default SongItem;
