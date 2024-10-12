import React  from 'react';
import {Composition, Sequence }   from 'remotion';
import {Transcript, transcript,transcriptDisplayDuration} from './Transcript';
import FlowerOfLife from './FlowerOfLife';
import { Fade } from './utils/Fade';

const fps= 30;

export const RemotionVideo: React.FC = () => {
  const totalDuration = 6 * fps + transcriptDisplayDuration * fps * transcript.length;

  return (
    <>
      <Composition
        id="MainVideo"
        component={() => <MainVideo />}
        durationInFrames={totalDuration}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};

const MainVideo: React.FC = () => {
  const introDuration = 6 * fps; // 6 seconds at 30 fps
  const transitionDuration = Number(fps); // 1-second transition

  return (
    <>
     <Sequence durationInFrames={introDuration + transitionDuration}>
        <Fade type="out" durationInFrames={transitionDuration} startAt={introDuration - transitionDuration}>
          <FlowerOfLife />
        </Fade>
      </Sequence>
      <Sequence from={introDuration}>
        <Fade type="in" durationInFrames={transitionDuration}>
          <Transcript />
        </Fade>
      </Sequence>
    </>
  );
};