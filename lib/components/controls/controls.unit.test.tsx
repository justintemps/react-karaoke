import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Play, Pause } from ".";

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

describe("Play and Pause Buttons are interactive", () => {
  test("Play button handles click", () => {
    testButtonClick(Play, "rk-play-button");
  });

  test("Play button handles click", () => {
    testButtonClick(Pause, "rk-pause-button");
  });
});
