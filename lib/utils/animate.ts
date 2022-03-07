/**
 * Returns the next step in an easeOut function given four numbers
 * How much time has elapsed since the transition began
 * Where the transition should start
 * Where the tansition should end
 * How long the transition should last
 */

function easeOutSine(
  elapsed: number,
  from: number,
  to: number,
  duration: number
) {
  // return to * Math.sin((elapsed / duration) * (Math.PI / 2)) + from;
  return from + (to - from) * Math.sin((elapsed / duration) * (Math.PI / 2));
}

interface AnimateOptions {
  duration: number;
  onUpdate: (value: number) => void;
}

/**
 * Provides an easeOut transition between two numbers
 * Transition is set by options duration property.
 * A callback is fired on each update, also set in options
 */
export default function animate(
  from: number,
  to: number,
  options: AnimateOptions = {
    duration: 500,
    onUpdate: () => {},
  }
) {
  // Check to make sure we're in the browser
  if (
    typeof window === "undefined" &&
    !global.hasOwnProperty("requestAnimationFrame")
  ) {
    return false;
  }

  const { duration, onUpdate } = options;

  // Starting values for the animation
  let start: number | undefined;
  let previousTimeStamp: number | undefined;

  function step(timestamp: number) {
    // If start is undefined, this must be the first step
    // So set the start value to be the current timestamp
    if (start === undefined) {
      start = timestamp;
    }

    // How much time has elapsed between the current timestamp
    // and the time the animation started?
    const elapsed = timestamp - start;

    // If the last time stamp is not now, then run the animation
    // and pass the value to the callback
    if (previousTimeStamp !== timestamp) {
      const x = easeOutSine(elapsed, from, to, duration);
      onUpdate(Math.round(x));
    }

    // If less time has elapsed than the duration, set the
    // previousTimeStamp as now and then call the step function
    // recursively
    if (elapsed < duration) {
      previousTimeStamp = timestamp;
      requestAnimationFrame(step);
    }

    if (elapsed >= duration) {
      onUpdate(to);
      return;
    }
  }

  requestAnimationFrame(step);
}
