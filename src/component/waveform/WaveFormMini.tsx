import WaveSurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime, setDuration, nextSong } from "../../slice/playerSlice";

const WaveFormMini = ({ status, onCurrentTime, onDuration }: any) => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state: any) => state.player);
  const waveformRef: any = useRef(null);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  useEffect(() => {
    if (!waveformRef.current) return;
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      height: 0,
      hideScrollbar: true,
      waveColor: "transparent",
      progressColor: "transparent",
      autoCenter: false,
      url: currentSong ? currentSong?.Music?.file : "",
      plugins: [
        Minimap.create({
          height: 10,
          waveColor: "white",
          progressColor: "#ff5500",
        }),
      ],
    });
    setWavesurfer(ws);
    ws.on("audioprocess", () => {
      const currentTime = ws.getCurrentTime();
      dispatch(setCurrentTime(currentTime));
      if (onCurrentTime) {
        onCurrentTime(currentTime);
      }
    });
    ws.on("ready", () => {
      const duration = ws.getDuration();
      dispatch(setDuration(duration));
      if (onDuration) {
        onDuration(duration);
      }
    });
    ws.on("finish", () => {
      dispatch(nextSong());
    });
    return () => {
      ws.destroy();
    };
  }, [currentSong]);
  if (wavesurfer) {
    if (status == true) {
      wavesurfer.play();
    } else {
      wavesurfer.pause();
    }
  }

  return (
    <div ref={waveformRef} style={{ height: "10px", width: "100%" }}></div>
  );
};

export default WaveFormMini;
