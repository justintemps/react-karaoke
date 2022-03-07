import React, { useContext, useEffect, useMemo, useState } from "react";
import Scrollbar from "react-scrollbars-custom";
import { ScrollState } from "react-scrollbars-custom/dist/types/types";
import animate from "../../utils/animate";
import srt2Json from "../../utils/srt2json";
import { KaraokeCtx } from "../karaoke";
import styles from "./lyrics.module.scss";

interface Props {
  srt: string;
}

interface Caption {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface CaptionLine {
  text: string;
  id: number;
  selected: boolean;
}

const Caption: React.FC<CaptionLine> = ({ text, id, selected }) => {
  // Don't render a caption if it doesn't have any text
  if (!text || text.length === 0) {
    return null;
  }
  return <p id={`rk-caption-${id}`}>{text}</p>;
};

const Lyrics: React.FC<Props> = ({ srt }) => {
  const { karaokeState } = useContext(KaraokeCtx);

  const { currentTime: time } = karaokeState;

  const captions: Caption[] = useMemo(() => srt2Json(srt), [srt]);
  const [currentCaption, setCurrentCaption] = useState<Caption>(captions[0]);
  const [scrollTop, setScrollTop] = useState<number>(0);

  function updateCaption(caption: Caption) {
    setCurrentCaption(caption);
  }

  // Use this to keep track of user scrolling
  function updateScrollTop(scroll: ScrollState) {
    setScrollTop(scroll.scrollTop);
  }

  // Determines the current caption based on time
  useEffect(() => {
    const { start, end } = currentCaption;
    // If no time is given, don't do anything
    if (!time) {
      return;
    }

    // If time is within the current caption time
    // don't do anything
    if (time >= start && time < end) {
      return;
    }

    // Find the next caption
    const newCaption = captions.find(
      (caption) => time >= caption.start && time < caption.end
    );

    if (!newCaption) {
      return;
    }

    // Update the current caption
    updateCaption(newCaption);
  }, [time]);

  useEffect(() => {
    const { id } = currentCaption;
    const caption = document.getElementById(`rk-caption-${id}`);
    scrollTo(caption?.offsetTop);
  }, [currentCaption]);

  function scrollTo(target: number | undefined, duration: number = 750) {
    const to = target ?? 0;
    animate(scrollTop, to, {
      duration,
      onUpdate: (v) => {
        if (v) {
          setScrollTop(v);
        }
      },
    });
  }

  return (
    <figure className={styles.captions}>
      <div className={styles.outer_captions_container}>
        <div className={styles.heading}></div>
        <Scrollbar
          noScrollX
          onScrollStop={updateScrollTop}
          scrollTop={scrollTop}
          style={{
            maxHeight: 260,
            height: 260,
          }}
          scrollerProps={{
            style: {
              paddingRight: "32px",
            },
          }}
          trackYProps={{
            style: {
              height: "100%",
              top: 0,
              opacity: 1,
              background: "grey",
            },
          }}
          thumbYProps={{
            style: {
              opacity: 1,
              background: "black",
            },
          }}
        >
          <div className={styles.inner_captions_container}>
            {captions.map(({ text, id }) => (
              <Caption
                key={id}
                id={id}
                text={text}
                selected={id == currentCaption.id}
              />
            ))}
          </div>
        </Scrollbar>
      </div>
    </figure>
  );
};

export default Lyrics;
