import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import WaveSurfer from "wavesurfer.js";
const Test = () => {
  const audioElement = document.createElement("audio");
  const videoRef = useRef();
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(
      "https://res.cloudinary.com/dw6wgytc3/raw/upload/v1/music/hls/1737813168863/playlist"
    );
    hls.attachMedia(audioElement);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      // Tạo WaveSurfer khi stream đã sẵn sàng
      const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "red",
        progressColor: "red",
        barWidth: 2,
        mediaElement: audioElement,
      });
    });
  } else if (audioElement.canPlayType("application/vnd.apple.mpegurl")) {
    // Nếu không dùng được hls.js, dùng trực tiếp phương thức của browser để chơi HLS
    audioElement.src =
      "https://res.cloudinary.com/dw6wgytc3/raw/upload/v1/music/hls/1737813168863/playlist";
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "red",
      progressColor: "red",
      barWidth: 2,
      mediaElement: audioElement,
    });
  }

  return (
    <>
      <div>
        <video
          ref={videoRef}
          controls
          style={{ width: "100%", height: "auto" }}
        ></video>
      </div>
    </>
  );
};

export default Test;
