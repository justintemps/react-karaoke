# React Karaoke

React Karaoke is a customizable, accessible audio player for React that syncs audio with scrolling lyrics.

## Status

_Work in Progress_. This project is not yet ready for prime time.

## Installation

`npm install react-karaoke`

or

`yarn add react-karaoke`

## Usage

```js
import { Karaoke, Lyrics, Player } from "react-karaoke";

const KaraokePlayer = () => (
  <Karaoke>
    <Player src="audio.mp3" />
    <Lyrics srt="lyrics.srt" />
  </Karaoke>
);
```

## Components

### `<Karaoke />`

Provider component that keeps the `<Player />` and `<Lyrics />` in sync.

### `<Player />`

All props except for `onUpdate` callback are passed to the underlying audio element. [See docs for more info](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

| Prop          | Description                          | Required |
| ------------- | ------------------------------------ | -------- |
| `src`         | string                               | Yes      |
| `crossorigin` | null, "anonymous", "use-credentials" | No       |
| `loop`        | boolean                              | No       |
| `muted`       | boolean                              | No       |
| `preload`     | boolean                              | No       |
| `onUpdate`    | (audioState: AudioState) => void     | No       |

#### AudioState

```ts
interface AudioState {
  currentTime: number;
  duration: number;
  paused: boolean;
  canplaythrough: boolean;
  ended: boolean;
}
```

### `<Lyrics />`

| Prop  | Description                                                | Required |
| ----- | ---------------------------------------------------------- | -------- |
| `srt` | [valid SRT string](https://docs.fileformat.com/video/srt/) | Yes      |
