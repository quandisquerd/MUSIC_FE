import { useState } from "react";
import { memo } from "react";
import WaveFormMini from "../waveform/WaveFormMini";
import { formatTime } from "../../util/formatTime";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePlayPause,
  nextSong,
  prevSong,
  setDuration,
} from "../../slice/playerSlice";
import {
  useAddFavoriteSongMutation,
  useCheckFavoriteSongWithUserQuery,
  useRemoveFavoriteSongMutation,
} from "../../api/music";
import { message } from "antd";
import {
  CaretRightOutlined,
  HeartFilled,
  HeartOutlined,
  MenuOutlined,
  PauseOutlined,
  RetweetOutlined,
  SoundOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const MusicPlayerBar = memo(({ user }: any) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const { currentSong, isPlaying } = useSelector((state: any) => state?.player);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: checkFavoriteSong } = useCheckFavoriteSongWithUserQuery({
    id: currentSong?.Music?.id,
    token: user?.token,
  });

  const [addFavorite, { isLoading: adding }] = useAddFavoriteSongMutation();
  const [removeFavorite] = useRemoveFavoriteSongMutation();
  const [currentTimes, setCurrentTime] = useState();
  const [durations, setDurations] = useState();
  const Duration = (value: any) => {
    dispatch(setDuration(value));
    setDurations(value);
  };
  const Current = (value: any) => {
    setCurrentTime(value);
  };
  const HandleLike = () => {
    if (clicked || adding) return;
    setClicked(true);
    const data = {
      songId: currentSong?.Music?.id,
    };
    addFavorite({ data, token: user?.token })
      .then((res: any) => {
        messageApi.success(res?.data?.message);
      })
      .catch((error: any) => {
        messageApi.error(error?.data?.message);
      })
      .finally(() => {
        setClicked(false);
      });
  };
  const HandleUnLike = () => {
    if (clicked || adding) return;
    setClicked(true);
    removeFavorite({ id: currentSong?.Music?.id, token: user?.token })
      .then((res: any) => {
        messageApi.success(res?.data?.message);
      })
      .catch((error: any) => {
        messageApi.error(error?.data?.message);
      })
      .finally(() => {
        setClicked(false);
      });
  };

  return (
    <>
      {/* {checking && <LoadingOverlay />} */}
      {contextHolder}
      <div className=" fixed bottom-0 left-0 right-0 z-50 bg-gray-200   px-4  text-black border-t shadow-lg select-none">
        <div className="ml-32 mr-32 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StepBackwardOutlined
              className="text-xl cursor-pointer hover:text-orange-500"
              onClick={() => dispatch(prevSong())}
            />
            {isPlaying ? (
              <PauseOutlined
                className="text-2xl cursor-pointer text-black font-bold"
                onClick={() => dispatch(togglePlayPause())}
              />
            ) : (
              <CaretRightOutlined
                className="text-2xl cursor-pointer text-black"
                onClick={() => dispatch(togglePlayPause())}
              />
            )}
            <StepForwardOutlined
              className="text-xl cursor-pointer hover:text-orange-500"
              onClick={() => dispatch(nextSong())}
            />
            <RetweetOutlined className="text-xl cursor-pointer hover:text-orange-500" />
          </div>

          {/* Progress Section */}
          <div className="flex items-center w-1/2 space-x-2">
            <span className="text-sm text-orange-500">
              {formatTime(currentTimes ? currentTimes : 0)}
            </span>

            <WaveFormMini
              status={isPlaying}
              onDuration={Duration}
              onCurrentTime={Current}
            />
            <span className="text-sm">
              {formatTime(durations ? durations : 0)}
            </span>
          </div>

          {/* Song Info Section */}
          <div className="flex items-center space-x-4 w-1/3 p-1">
            <SoundOutlined className="text-xl" />
            <Link to={`/music/${currentSong?.Music?.id}`}>
              <div className="flex items-center">
                <img
                  src={currentSong?.Music?.image}
                  alt="Song Thumbnail"
                  className="h-10 w-10 rounded"
                />
                <div className="ml-2">
                  <p className="text-sl font-bold">
                    {currentSong?.User?.username}
                  </p>
                  <p className="text-xs text-gray-600">
                    {currentSong?.Music?.name?.length > 20
                      ? currentSong?.Music?.name?.slice(0, 20)
                      : currentSong?.Music?.name}
                  </p>
                </div>
              </div>
            </Link>
            {checkFavoriteSong?.status ? (
              <HeartFilled
                className="text-xl cursor-pointer text-orange-500 hover:text-orange-500"
                onClick={() => HandleUnLike()}
              />
            ) : (
              <HeartOutlined
                className="text-xl cursor-pointer hover:text-orange-500"
                onClick={() => HandleLike()}
              />
            )}

            <UsergroupAddOutlined className="text-xl cursor-pointer hover:text-orange-500" />
            <MenuOutlined className="text-xl cursor-pointer hover:text-orange-500" />
          </div>
        </div>
      </div>
    </>
  );
});

export default MusicPlayerBar;
