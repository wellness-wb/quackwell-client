import React from 'react';
import bubbleImage from '../../../../assets/bubble.png';
import FloatingBubble from './FloatingBubble';

const BubbleBackground = () => {
  const bubblesConfig = [
    { delay: 0, size: 1000 },
    { delay: 50, size: 1500 },
    { delay: 100, size: 2000 },
    { delay: 150, size: 1750 },
    { delay: 150, size: 2050 },
    { delay: 50, size: 1500 },
    { delay: 200, size: 1000 },
    { delay: 250, size: 1000 },
    { delay: 300, size: 1500 },
    { delay: 320, size: 2000 },
    { delay: 340, size: 1750 },
    { delay: 250, size: 2050 },
    { delay: 170, size: 1500 },
    { delay: 0, size: 1000 },
  ];

  return (
    <>
      {bubblesConfig.map((config, index) => (
        <FloatingBubble
          key={index}
          source={bubbleImage}
          startX={Math.random() * 300}
          delay={config.delay}
          size={config.size}
        />
      ))}
    </>
  );
};

export default BubbleBackground;
