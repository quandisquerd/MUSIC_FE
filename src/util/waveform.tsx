import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import  { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { formatTime } from "./formatTime";
import { useDispatch, useSelector } from "react-redux";
import {
  nextSong,
  setCurrentTime,
  setDuration,
  togglePlayPause,
} from "../slice/playerSlice";
const Waveform = ({ isPlaying }: any) => {
  const waveformRef: any = useRef(null);
  const dispatch = useDispatch();
  const { currentSong, currentTime, duration } = useSelector(
    (state: any) => state.player
  );
  const [wavesurfer, setWavesurfer] = useState<any>(null);

  useEffect(() => {
    if (!waveformRef.current) return;
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "rgb(200, 200, 200)",
      progressColor: "#FF0000",
      barWidth: 2,
      height: 100,
      cursorWidth: 0,
      autoCenter: false,
      url: currentSong ? currentSong?.Music?.file : "",
      plugins: [
        Hover.create({
          lineColor: "red",
          lineWidth: 2,
          labelBackground: "#555",
          labelColor: "#fff",
          labelSize: "11px",
        }),
      ],
    });
    ws.setVolume(0); 
    setWavesurfer(ws);
    
    ws.on("audioprocess", () => {
      const currentTime = ws.getCurrentTime();
      dispatch(setCurrentTime(currentTime));
    });
    ws.on("ready", () => {
      const duration = ws.getDuration();
      dispatch(setDuration(duration));
    });
    ws.on("finish", () => {
      dispatch(nextSong()); 
    });
    return () => {
      ws.destroy();
    };
  }, [currentSong]);
  useEffect(() => {
    if (wavesurfer && currentTime && duration) {
      wavesurfer.seekTo(currentTime / duration);
    }
  }, [wavesurfer, currentTime, duration]);
  if (wavesurfer) {
    if (isPlaying == true) {
      wavesurfer.play();
    } else {
      wavesurfer.pause();
    }
  }
  return (
    <div
      className="  p-3 flex "
      // onClick={handlePlayPause}
      style={{ background: "#84878a" }}
    >
      <div className="w-2/3 ml-10">
        <div className="flex ">
          <button
            // onClick={handlePlayPause}
            style={{
              bottom: "10px",
              background: "#ff5500",
            }}
            className=" text-white border-none  rounded-full cursor-pointer text-lg flex justify-center items-center w-16 h-16"
          >
            {isPlaying ? (
              <PauseOutlined
                className="text-4xl mb-1"
                onClick={() => dispatch(togglePlayPause())}
              />
            ) : (
              <CaretRightOutlined
                className="text-4xl ml-1 mb-1"
                onClick={() => dispatch(togglePlayPause())}
              />
            )}
          </button>
          <div className=" ml-2 ">
            <span className=" justify-center items-center text-xl w-3/4 h-16 bg-black p-1 font-light">
              {currentSong?.Music?.name}
            </span>
            <div className="block  mt-2 ">
              <h2 className="bg-black inline-block px-1 text-white text-xl font-light ">
                {currentSong?.User?.username}
              </h2>
            </div>
          </div>

          <p className="ml-auto text-white">2 years ago</p>
        </div>

        <div
          className="waveform-container mt-28 "
          style={{ position: "relative" }}
        >
          <div ref={waveformRef}></div>
          {/* Current Time */}
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-5 text-xs font-bold bg-black text-white flex items-center justify-center rounded-md z-10">
            {formatTime(currentTime)}
          </span>
          {/* Total Duration */}
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-5 text-xs font-bold bg-black text-white flex items-center justify-center rounded-md z-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      <div className="h-80 w-80 ml-auto">
        <img
          src={currentSong?.Music?.image}
          alt=""
           className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Waveform;
