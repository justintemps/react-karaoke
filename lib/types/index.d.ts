export interface AudioState {
  currentTime: number;
  duration: number;
  paused: boolean;
  canplaythrough: boolean;
  ended: boolean;
}

export interface AudioOptions {
  src: string;
  crossorigin?: null | "anonymous" | "use-credentials";
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto" | "";
}
