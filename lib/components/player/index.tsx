import React, { useEffect, useContext } from "react";
import useAudio from "../../hooks/useAudio";
import { AudioOptions, AudioState } from "../../types";
import { Pause, Play, ProgressBar, SkipButton } from "../controls";
import styles from "./player.module.scss";
import { KaraokeCtx } from "../karaoke";

interface AudioPlayerProps extends AudioOptions {
  onUpdate?: (audioState: AudioState) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onUpdate, ...options }) => {
  const { state: playerState, controls } = useAudio(options);

  const { setKaraoke } = useContext(KaraokeCtx);

  useEffect(() => {
    if (onUpdate && typeof onUpdate === "function") {
      onUpdate(playerState);
    }
    setKaraoke(playerState);
  }, [playerState]);

  function handleStartPause() {
    const { paused } = playerState;
    if (paused) {
      return controls.play();
    }
    return controls.pause();
  }

  function handleSetProgress(progress: number) {
    const { duration } = playerState;
    const newTime = progress * duration;
    controls.seek(newTime);
  }

  function handleSkip(seconds: number) {
    const { duration, currentTime } = playerState;
    if (currentTime + seconds >= duration) {
      return controls.seek(duration);
    }
    return controls.seek(currentTime + seconds);
  }

  function getTimeRemaining() {
    const { duration, currentTime } = playerState;
    const timeRemaining = duration - currentTime;
    const min = Math.floor(timeRemaining / 60);
    const sec = Math.floor(timeRemaining - min * 60);
    const minutes = min.toString().padStart(2, "0");
    const seconds = sec.toString().padStart(2, "0");
    return { minutes, seconds };
  }

  const progress = playerState.currentTime / playerState.duration;
  const timeRemaining = getTimeRemaining();

  return (
    <div className={styles.player}>
      {!playerState.paused ? (
        <Pause onClick={handleStartPause} className={styles.play_pause} />
      ) : (
        <Play
          onClick={handleStartPause}
          disabled={!playerState.canplaythrough}
          className={styles.play_pause}
        />
      )}
      <div className={styles.skip_buttons}>
        <SkipButton handleSkip={handleSkip} direction="rewind" />
        <SkipButton handleSkip={handleSkip} direction="forward" />
      </div>
      <div className={styles.progress_bar}>
        <ProgressBar
          handleSetProgress={handleSetProgress}
          progress={progress}
        />
      </div>
      <div
        className={styles.time_remaining}
      >{`${timeRemaining.minutes}:${timeRemaining.seconds}`}</div>
    </div>
  );
};

export default AudioPlayer;
