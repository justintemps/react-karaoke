import React from "react";
import ReactDOM from "react-dom";
import { Karaoke, Player } from "react-karaoke";

const sample =
  "https://prismic-io.s3.amazonaws.com/ilo-voices/ef59419d-7451-4d45-abd0-cb7490f50906_The+Future+of+Work+Podcast+-+The+impact+of+the+COVID-19+crisis+on+women+or+migrant+workers+%28English%29.mp3";

ReactDOM.render(
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      alignItems: "center",
    }}
  >
    <h1>React Karaoke</h1>
    <div style={{ width: "500px" }}>
      <Karaoke>
        <Player src={sample} />
      </Karaoke>
    </div>
  </div>,
  document.getElementById("player")
);
