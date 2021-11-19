function easeOutSine(t: number, b: number, c: number, d: number) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}

interface AnimateOptions {
  duration?: number;
  onUpdate?: (value: number) => void;
}

export default function animate(
  from: number,
  to: number,
  options?: AnimateOptions
) {
  if (
    typeof window === "undefined" &&
    !global.hasOwnProperty("requestAnimationFrame")
  ) {
    return false;
  }
  // Set defaults for arguments
  const duration = options?.duration ?? 1000;
  const onUpdate = options?.onUpdate ?? function (value) {};

  let start: number | undefined;
  let previousTimeStamp: number | undefined;

  function step(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
      let x = easeOutSine(elapsed, from, to, duration);
      x = Math.min(x, to);
      onUpdate(x);
      console.log({ x, timestamp, elapsed });
    }

    if (elapsed < duration) {
      previousTimeStamp = timestamp;
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
