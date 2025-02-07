import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import "./css.scss";
import { formatTime } from "./formatTime";
import { useDispatch, useSelector } from "react-redux";
import { togglePlayPause } from "../slice/playerSlice";
import { useEffect, useState } from "react";
const waveform = ({ isPlaying }: any) => {
  const dispatch = useDispatch();
  const { currentSong, currentTime, duration } = useSelector(
    (state: any) => state.player
  );

  const [rotation, setRotation] = useState(0);
  console.log(rotation);

  useEffect(() => {
    let frameId: any;

    const rotate = () => {
      if (isPlaying) {
        setRotation((prevRotation) => prevRotation + 1);
        frameId = requestAnimationFrame(rotate);
      }
    };

    if (isPlaying) {
      frameId = requestAnimationFrame(rotate);
    } else {
      cancelAnimationFrame(frameId);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);
  const loads = Array.from({ length: 6 }, (_, index) => (
    <div key={index} className={`${isPlaying ? "load" : "load1"}`}></div>
  ));
  return (
    <div className="flex p-3 rounded-lg shadow-lg mb-5">
      <div className="w-3/4 mx-auto bg-white rounded-lg overflow-hidden  dark:bg-zinc-700">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center">
            <svg
              className="h-12 w-12 mr-2"
              style={{
                color: "#ff5500",
              }}
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <div className="mx-3">
              <h3 className="text-4xl font-medium text-gray-700 dark:text-gray-200">
                {currentSong?.Music?.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xl mt-2">
                {currentSong?.User?.username}
              </p>
            </div>
          </div>
          {isPlaying ? (
            <div className="flex ml-auto mr-6 mb-12">
                <div className="loading ml-auto">{loads}</div>
            </div>
          ) : (
            <div className="flex ml-auto mr-6 mb-12">
              <div className="loading ml-auto">
              <div className="loading ml-auto">{loads}</div>
              </div>
            </div>
          )}
          <div className="flex-2 items-center">
            <p className="mb-5 text-gray-400">1 year ago</p>

            <button
              style={{
                bottom: "10px",
                background: "#ff5500",
              }}
              className=" text-white border-none  rounded-full cursor-pointer text-2xl flex justify-center items-center w-16  h-16"
            >
              {isPlaying ? (
                <PauseOutlined
                  className="text-2xl mb-1"
                  onClick={() => dispatch(togglePlayPause())}
                />
              ) : (
                <CaretRightOutlined
                  className="text-2xl ml-1 mb-1"
                  onClick={() => dispatch(togglePlayPause())}
                />
              )}
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>

        <div className="px-6 py-4 mt-5">
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            <span className="mr-5">{formatTime(currentTime)} </span>
            <div
              style={{ width: "95%", position: "relative" }}
              className="group h-10 flex items-center justify-center"
            >
              <div
                style={{
                  // height: "4px",
                  width: "100%",
                  backgroundColor: "#e0e0e0",
                  position: "relative",
                }}
                className="h-0.5  transition-all duration-300 w-full"
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(currentTime / duration) * 100}%`,
                    backgroundColor: "#ff5500",
                    transition: "width 0.1s linear",
                  }}
                ></div>
              </div>
              <audio style={{ display: "none" }}></audio>
            </div>
            <span className="ml-5"> {formatTime(duration)} </span>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-72 ml-2">
        <img
          id="image"
          src={currentSong?.Music?.image}
          alt=""
          style={{
            // transform: `rotate(${rotation}deg)`,
            transformOrigin: "center", // Đảm bảo hình ảnh quay quanh tâm
          }}
          className="h-72  object-cover rounded transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default waveform;
