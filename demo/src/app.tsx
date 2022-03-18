import React from "react";
import ReactDOM from "react-dom";
import { Karaoke, Lyrics, Player } from "react-karaoke-player";
import srt from "../public/srt";

const audio =
  "https://prismic-io.s3.amazonaws.com/ilo-voices/ef59419d-7451-4d45-abd0-cb7490f50906_The+Future+of+Work+Podcast+-+The+impact+of+the+COVID-19+crisis+on+women+or+migrant+workers+%28English%29.mp3";

const App = () => {
  return (
    <Karaoke>
      <Player src={audio} />
      <Lyrics srt={srt} />
    </Karaoke>
  );
};

ReactDOM.render(
  <div
    style={{
      margin: "0 auto",
      width: "500px",
    }}
  >
    <h1>React Karaoke</h1>
    <App />
  </div>,
  document.getElementById("player")
);
