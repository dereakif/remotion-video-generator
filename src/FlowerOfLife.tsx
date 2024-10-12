import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { AbsoluteFill, spring } from 'remotion';

 const bgColor = "#0D0D0D";

const FlowerOfLife: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  const radius = 100;
  const baseX = 960; // Center of a 1920x1080 canvas
  const baseY = 540; // Center of a 1920x1080 canvas

  const circlePositions = [
    // Center circle
    { x: baseX, y: baseY },
    // First layer (clockwise)
    { x: baseX + radius, y: baseY },
    { x: baseX + radius / 2, y: baseY + radius * Math.sqrt(3) / 2 },
    { x: baseX - radius / 2, y: baseY + radius * Math.sqrt(3) / 2 },
    { x: baseX - radius, y: baseY },
    { x: baseX - radius / 2, y: baseY - radius * Math.sqrt(3) / 2 },
    { x: baseX + radius / 2, y: baseY - radius * Math.sqrt(3) / 2 },
  ];

  const circles = circlePositions.map((pos, index) => {
    const progress = spring({
      frame: frame - 6 - index * 15,
      fps,
      config: {
        damping: 20,
      },
    });

    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const strokeWidth = interpolate(progress, [0, 1], [5, 2]);
    const glowOpacity = interpolate(progress, [0, 0.3, 0.7, 1], [0, 1, 0.5, 0]);


    return (
      <g key={index}>
        {/* Outer glow effect */}
        <circle
          cx={pos.x}
          cy={pos.y}
          r={radius}
          fill="none"
          stroke="#EEE8AA"
          strokeWidth="5"
          opacity={glowOpacity}
          filter="url(#blur)"
        />
        {/* Main circle */}
        <circle
          cx={pos.x}
          cy={pos.y}
          r={radius}
          fill="none"
          stroke="#C0C0C0"
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      </g>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor}}>
      <Audio src={staticFile('bell-sound.mp3')} />
      <svg width="1920" height="1080">
        <defs>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>
        {circles}
      </svg>
    </AbsoluteFill>
  );
};

export default FlowerOfLife;