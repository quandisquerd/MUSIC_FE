import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime, setDuration, nextSong } from "../../slice/playerSlice";
import Hls from "hls.js";

const WaveFormMini = ({ status, onCurrentTime, onDuration }: any) => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state: any) => state.player);
  const waveformRef: any = useRef(null);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  // useEffect(() => {
  //   if (!waveformRef.current) return;
  //   const ws = WaveSurfer.create({
  //     container: waveformRef.current,
  //     height: 0,
  //     hideScrollbar: true,
  //     waveColor: "transparent",
  //     progressColor: "transparent",
  //     autoCenter: false,
  //     url: currentSong ? currentSong?.Music?.file : "",
  //     plugins: [
  //       Minimap.create({
  //         height: 10,
  //         waveColor: "white",
  //         progressColor: "#ff5500",
  //       }),
  //     ],
  //   });
  //   setWavesurfer(ws);
  //   ws.on("audioprocess", () => {
  //     const currentTime = ws.getCurrentTime();
  //     dispatch(setCurrentTime(currentTime));
  //     if (onCurrentTime) {
  //       onCurrentTime(currentTime);
  //     }
  //   });
  //   ws.on("ready", () => {
  //     const duration = ws.getDuration();
  //     dispatch(setDuration(duration));
  //     if (onDuration) {
  //       onDuration(duration);
  //     }
  //   });
  //   ws.on("finish", () => {
  //     dispatch(nextSong());
  //   });
  //   return () => {
  //     ws.destroy();
  //   };
  // }, [currentSong]);
  const videoSrc =
    "https://cdn.khophim121.com/vietnam/dan-phuong-0712/output.m3u8";
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video: any = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play();
        setIsPlaying(true);
      });
    }
  }, [currentSong?.Music?.file]);

  const togglePlayPause = () => {
    const video: any = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const video: any = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  const handleProgressChange = (e: any) => {
    const video: any = videoRef.current;
    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e: any) => {
    const volumeValue: any = e.target.value;
    setVolume(volumeValue);
    videoRef.current.volume = volumeValue;
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", updateProgress);
    video.volume = volume;
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, [volume]);
  useEffect(() => {
    if (currentTime) {
      onCurrentTime(currentTime);
      const duration = videoRef.current?.duration || 0;
      onDuration(duration);
    }
  }, [currentTime]);

  return (
    <div className="audio-player w-full">
      <figure className="audio-figure">
        <div className="audio-info"></div>
        <video
          ref={videoRef}
          controls
          style={{ width: "100%", height: "auto", display: "none" }}
        />
        <div className="controls">
          <input
            className="progress-bar w-full "
            type="range"
            value={(currentTime / videoRef.current?.duration) * 100 || 0}
            onChange={handleProgressChange}
            style={{
              appearance: "none",
              height: "5px",
              borderRadius: "5px",
              background: `linear-gradient(to right, orange ${
                (currentTime / videoRef.current?.duration) * 100
              }%, #e5e7eb ${
                (currentTime / videoRef.current?.duration) * 100
              }%)`,
              outline: "none",
              border: "1px solid lightgray",
            }}
          />
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: orange;
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }

            input[type="range"]::-moz-range-thumb {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: orange;
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }
          

        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 5px;
          background: gray; /* Phần chưa chạy màu gray */
        }
          `}</style>
          {/* <div className="volume-bar">
            <input
              className="volume-field"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div> */}
        </div>
      </figure>
    </div>
  );
};

export default WaveFormMini;
