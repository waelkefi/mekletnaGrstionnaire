import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from './check.json';

function LottieAnimation() {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      ref={animationContainerRef}
      style={{ width: '100px', height: '100px' }}
    />
  );
}

export default LottieAnimation;
