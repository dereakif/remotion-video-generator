import React  from 'react';
import {  interpolate, useCurrentFrame}  from 'remotion';

interface FadeProps {
  type: 'in' | 'out';
  durationInFrames: number;
  startAt?: number;
  children: React.ReactNode;
  bgColor?: string;
}

export const Fade: React.FC<FadeProps> = ({type, durationInFrames, startAt = 0, children, bgColor }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - startAt;
  const opacity = interpolate(
    effectiveFrame,
    [0, durationInFrames],
    type === 'in' ? [0, 1] : [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: bgColor || 'black'
      }}
    >
      <div
      style={{
        opacity,
        width: '100%',
        height: '100%',
      }}
      >
      {children}
      </div>
    </div>
  );
};