import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime, nextSong } from "../../slice/playerSlice";
import Hls from "hls.js";

const WaveFormMini = ({ status, onCurrentTime, onDuration }: any) => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state: any) => state.player);
  const audioRef: any = useRef(null);
  const [currentTime, setLocalCurrentTime] = useState(0);
  const [duration, setLocalDuration] = useState(0);
  const progressRef: any = useRef(null);
  
  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(currentSong?.Music?.file);
      hls.attachMedia(audioRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audioRef.current.play();
      });

      audioRef.current.addEventListener("timeupdate", () => {
        const time = audioRef.current.currentTime;
        const dur = audioRef.current.duration;

        setLocalCurrentTime(time);
        setLocalDuration(dur);

        dispatch(setCurrentTime(time));
        if (onCurrentTime) onCurrentTime(time);
        if (onDuration) onDuration(dur);
      });

      audioRef.current.addEventListener("ended", () => {
        dispatch(nextSong());
      });

      return () => {
        hls.destroy();
      };
    } else if (audioRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = currentSong?.Music?.file;

      audioRef.current.addEventListener("timeupdate", () => {
        const time = audioRef.current.currentTime;
        const dur = audioRef.current.duration;

        setLocalCurrentTime(time);
        setLocalDuration(dur);
        onDuration(dur);

        dispatch(setCurrentTime(time));
        if (onCurrentTime) onCurrentTime(time);
      });

      audioRef.current.addEventListener("ended", () => {
        dispatch(nextSong());
      });
    } else {
      console.error("Trình duyệt không hỗ trợ HLS.");
    }
  }, [currentSong]);

  if (audioRef?.current) {
    if (status == true) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setLocalCurrentTime(newTime);
    dispatch(setCurrentTime(newTime));
    if (onCurrentTime) onCurrentTime(newTime);
  };
  const handleProgressClick = (e: any) => {
    if (!audioRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // vị trí click tính từ đầu thanh
    const width = rect.width; // chiều dài của thanh
    const newTime = (clickX / width) * duration;

    audioRef.current.currentTime = newTime;
    setLocalCurrentTime(newTime);
    dispatch(setCurrentTime(newTime));
  };
  return (
    <div style={{ width: "100%", position: "relative" }} className="group h-10 flex items-center justify-center">
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        style={{
          // height: "4px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          position: "relative",
        }}
      className="h-0.5 group-hover:h-2 transition-all duration-300 w-full"
        onMouseDown={handleMouseDown}
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
      <audio ref={audioRef} style={{ display: "none" }}></audio>
    </div>
  );
};

export default WaveFormMini;
