import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import renderer from "react-test-renderer";
import Lyrics from ".";
import { KaraokeCtx } from "../karaoke";

const srt = `
1
00:00:00,000 --> 00:00:02,000
This is the first line

2
00:00:02,001 --> 00:00:05,000
This is the second line

3
00:00:05,001 --> 00:00:10,000
This is the third line
`;

interface CustomRenderOptions extends RenderOptions {
  providerValue: KaraokeCtx;
}

const customRender = (
  ui: ReactElement,
  { providerValue, ...renderOptions }: CustomRenderOptions
) => {
  return render(
    <KaraokeCtx.Provider value={providerValue}>{ui}</KaraokeCtx.Provider>,
    renderOptions
  );
};

describe("Lyrics", () => {
  const providerValue = {
    karaokeState: {
      currentTime: 6,
      duration: 0,
      paused: false,
      canplaythrough: true,
      ended: false,
    },
    setKaraoke: () => {},
  };

  it("sets the correct line to be active", () => {
    const { getByText } = customRender(<Lyrics srt={srt} />, {
      providerValue,
    });
    const activeLine = getByText("This is the third line");
    expect(activeLine.getAttribute("data-rk-active")).toBe("true");
  });
});
