import { useEffect, useRef } from "react";
import Hls from "hls.js";

const AudioPlayer = ({ src }: { src: string }) => {
const audioRef: any = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(audioRef.current);
      return () => {
        hls.destroy();
      };
    } else if (audioRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = src;
    } else {
      console.error("Trình duyệt không hỗ trợ HLS.");
    }
  }, [src]);
  const handlePlay = () => {
    const allAudios = document.querySelectorAll("audio");

    allAudios.forEach((audio) => {
      if (audio !== audioRef.current) {
        audio.pause();
      }
    });

    audioRef.current?.play();
  };
  return <audio ref={audioRef} controls className="w-60" onPlay={handlePlay}/>;
};

export default AudioPlayer;
