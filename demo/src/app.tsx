import React from "react";
import ReactDOM from "react-dom";
import AudioPlayer, { useAudio } from "react-a11y-audio-player";

ReactDOM.render(
  <div>
    It finally works
    <AudioPlayer src="../public/sample.mp3" />
  </div>,
  document.getElementById("player")
);
