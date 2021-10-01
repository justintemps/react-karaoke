import { useState, useEffect, useRef, MutableRefObject } from "react";
import { AudioOptions, AudioState } from "../types";

const initialState: AudioState = {
  currentTime: 0,
  duration: 0,
  paused: true,
  canplaythrough: false,
  ended: false,
};

const useAudio = ({
  src,
  crossorigin = null,
  loop = false,
  muted = false,
  preload = "auto",
}: AudioOptions) => {
  // We'll keep our audio element in this ref
  const audio = useRef() as MutableRefObject<HTMLAudioElement>;

  // Initialize Player State
  const [state, setState] = useState<AudioState>({
    ...initialState,
  });

  // Method for updateing player state
  const setPlayer = (partialState: Partial<AudioState>) =>
    setState((prevState) => ({ ...prevState, ...partialState }));

  /* -- Handlers for audio events -- */
  function handleLoadData() {
    if (audio) {
      setPlayer({ duration: audio.current.duration });
    }
  }

  function handleTimeUpdate() {
    if (audio) {
      setPlayer({ currentTime: audio.current.currentTime });
    }
  }

  function handleEnded() {
    if (audio) {
      setPlayer({ currentTime: 0, paused: true, ended: true });
    }
  }

  function handlePlay() {
    if (audio) {
      setPlayer({ paused: false });
    }
  }

  function handlePause() {
    if (audio) {
      setPlayer({ paused: true });
    }
  }

  function handleCanPlayThrough() {
    if (audio) {
      setPlayer({ canplaythrough: true });
    }
  }

  let lockPlay: boolean = false;

  // Player controls
  const controls = {
    play: () => {
      // Some browsers return `Promise` on `.play()` and may throw errors
      // if one tries to execute another `.play()` or `.pause()` while that
      // promise is resolving. So we prevent that with this lock.
      // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
      if (!lockPlay && state.canplaythrough) {
        const promise = audio.current?.play();
        const isPromise = typeof promise === "object";
        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise?.then(resetLock).catch((e) => {
            console.error(e);
            resetLock();
          });
        }
        return promise;
      }
      return undefined;
    },
    pause: () => {
      if (audio) {
        audio.current.pause();
      }
    },
    seek: (time: number) => {
      if (audio) {
        audio.current.currentTime = time;
      }
    },
  };

  // Instantiate the new Audio element and add listeners
  useEffect(() => {
    audio.current = new Audio(src);
    audio.current.preload = preload;
    audio.current.muted = muted;
    audio.current.loop = loop;
    audio.current.crossOrigin = crossorigin;
    audio.current.addEventListener("loadeddata", handleLoadData);
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    audio.current.addEventListener("ended", handleEnded);
    audio.current.addEventListener("play", handlePlay);
    audio.current.addEventListener("pause", handlePause);
    audio.current.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      audio.current.pause();
      audio.current.removeEventListener("loadeddata", handleLoadData);
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
      audio.current.removeEventListener("ended", handleEnded);
      audio.current.removeEventListener("play", handlePlay);
      audio.current.removeEventListener("pause", handlePause);
      audio.current.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, []);

  // Update the audio element when src changes and update state
  useEffect(() => {
    audio.current.src = src;
    audio.current.load();
    audio.current.pause();
    audio.current.currentTime = 0;
    setPlayer({ currentTime: 0, canplaythrough: false, ended: false });
  }, [src]);

  // Update the audio element when loop or muted change
  useEffect(() => {
    audio.current.muted = muted;
    audio.current.loop = loop;
  }, [muted, loop]);

  return { state, controls, audioEl: audio };
};

export default useAudio;
