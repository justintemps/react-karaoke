import React, { useState } from "react";
import { AudioState } from "../../types";

export interface KaraokeCtx {
  karaokeState: AudioState;
  setKaraoke: (partialAudioState: Partial<AudioState>) => void;
}

const initialAudio: AudioState = {
  currentTime: 0,
  duration: 0,
  paused: true,
  canplaythrough: false,
  ended: false,
};

const initialKaroke: KaraokeCtx = {
  karaokeState: initialAudio,
  setKaraoke: ({}) => {},
};

export const KaraokeCtx = React.createContext<KaraokeCtx>(initialKaroke);

const Karaoke: React.FC = ({ children }) => {
  const [audioState, setAudioState] = useState(initialAudio);

  function setKaraoke(partialAudio: Partial<AudioState>) {
    setAudioState((prevAudioState) => ({ ...prevAudioState, ...partialAudio }));
  }

  const ctx = { karaokeState: audioState, setKaraoke };

  return <KaraokeCtx.Provider value={ctx}>{children}</KaraokeCtx.Provider>;
};

export default Karaoke;
