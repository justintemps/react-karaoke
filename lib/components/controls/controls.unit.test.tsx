import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Pause, Play, ProgressBar, SkipButton } from ".";

function testButtonClick(
  Button: React.FC<{ onClick: () => void }>,
  testId: string
) {
  const cb = jest.fn();
  const { getByTestId } = render(<Button onClick={cb} />);
  const button = getByTestId(testId);
  userEvent.click(button);
  expect(cb).toHaveBeenCalled();
}

function testSkipButtonClick(direction: "forward" | "rewind") {
  const increment = 20;
  const expected = direction === "forward" ? increment : -1 * increment;
  const cb = jest.fn((increment) => increment);
  const { getByTestId } = render(
    <SkipButton direction={direction} handleSkip={cb} increment={increment} />
  );
  const button = getByTestId(`rk-skip-button-${direction}`);
  userEvent.click(button);
  expect(cb.mock.calls[0][0]).toBe(expected);
}

describe("Controls are interactive", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Play button handles click", () => {
    testButtonClick(Play, "rk-play-button");
  });

  test("Pause button handles click", () => {
    testButtonClick(Pause, "rk-pause-button");
  });

  test("Forward skip button passes +increment to click handler", () => {
    testSkipButtonClick("forward");
  });

  test("Rewind skip button passes -increment to click handler", () => {
    testSkipButtonClick("rewind");
  });

  test("ProgressBar passes percent to click handler", () => {
    const WIDTH = 500;
    const CLICK_LOCATION = 250;

    // Set up our mocked useRef
    const ref = { current: {} };
    Object.defineProperty(ref, "current", {
      set(_current) {
        if (_current) {
          jest
            .spyOn(_current, "getBoundingClientRect")
            .mockReturnValueOnce({ width: WIDTH });
        }
        this._current = _current;
      },
      get() {
        return this._current;
      },
    });

    // Hijack useRef to use our ref as the return value for useRef
    jest.spyOn(React, "useRef").mockReturnValueOnce(ref);

    // Our test callback should return percent
    const cb = jest.fn((percent) => percent);

    // Render the progress bar and get a reference
    const { getByTestId } = render(
      <ProgressBar progress={0} handleSetProgress={cb} />
    );
    const progressBar = getByTestId("rk-progress-bar");

    // Set up the event which should fire when the progress bar gets clicked
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, "offsetX", { get: () => CLICK_LOCATION });

    // Click on the progress bar
    fireEvent(progressBar, event);

    // Expect the callback to receive a percentage of the click location
    // with respect to the width of the progress bar
    expect(cb.mock.calls[0][0]).toBe(CLICK_LOCATION / WIDTH);
  });
});
