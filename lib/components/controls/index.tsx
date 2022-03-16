import classnames from "classnames";
import React, { useRef } from "react";
import styles from "./controls.module.scss";

interface Props {
  onClick: () => void;
  style?: {};
  className?: string;
}

interface PlayProps extends Props {
  disabled?: boolean;
}

const Play: React.FC<PlayProps> = ({
  onClick = () => {},
  style,
  disabled = false,
  className,
}) => {
  return (
    <button
      data-testid="rk-play-button"
      disabled={disabled}
      aria-label="Play"
      onClick={onClick}
      style={style}
      className={classnames(styles.play, className)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <g>
          <circle cx="20" cy="20" r="19" fill="black" />
          <path fill="white" d="M31.334 19.667l-19.333 9.666V10z" />
        </g>
      </svg>
    </button>
  );
};

const Pause: React.FC<Props> = ({ onClick = () => {}, style, className }) => {
  return (
    <button
      data-testid="rk-pause-button"
      aria-label="Pause"
      onClick={onClick}
      style={style}
      className={classnames(styles.pause, className)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <g>
          <circle cx="20" cy="20" r="19" fill="black" />
          <path d="M13 12h4v16h-4zm10 0h4v16h-4z" fill="white" />
        </g>
      </svg>
    </button>
  );
};

interface ProgressBarProps {
  handleSetProgress: (percentClick: number) => void;
  progress: number | string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  handleSetProgress,
  progress = 0,
  className,
}) => {
  const progressBar = useRef<HTMLDivElement>(null);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (progressBar && progressBar.current) {
      const { width } = progressBar.current.getBoundingClientRect();
      const percentClick = e.nativeEvent.offsetX / width;
      handleSetProgress(percentClick);
    }
  }

  const progressCss = { "--progress": `${progress}` } as React.CSSProperties;

  return (
    <div className={classnames(styles.progress_bar_wrapper, className)}>
      <div
        ref={progressBar}
        onClick={handleClick}
        className={styles.progress_bar}
        style={progressCss}
        data-testid="rk-progress-bar"
      ></div>
    </div>
  );
};

interface SkipButtonProps {
  handleSkip: (seconds: number) => void;
  direction: "forward" | "rewind";
  increment?: number;
}

const SkipButton: React.FC<SkipButtonProps> = ({
  handleSkip,
  direction,
  increment = 10,
}) => {
  const ariaLabel =
    direction === "forward" ? "Forward 10 seconds" : "Rewind 10 seconds";

  const buttonLabel =
    direction === "forward" ? `+${increment}` : `-${increment}`;

  function handleClick() {
    const seconds = direction === "forward" ? increment : -1 * increment;
    handleSkip(seconds);
  }

  return (
    <>
      <button
        aria-label={ariaLabel}
        className={styles.skip_button}
        onClick={handleClick}
        data-testid={`rk-skip-button-${direction}`}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="100"
            cy="100"
            r="98"
            stroke="black"
            strokeWidth="4"
            fill="white"
          ></circle>
          <text
            textLength="170"
            style={{ font: "115px monospace" }}
            x="16"
            y="135"
          >
            {buttonLabel}
          </text>
        </svg>
      </button>
    </>
  );
};

export { Play, Pause, ProgressBar, SkipButton };
