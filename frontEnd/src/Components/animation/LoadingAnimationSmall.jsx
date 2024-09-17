import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from './loading.json';

function LoadingAnimationSmall() {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20 , height : "40vh"}}>
      <div
        ref={animationContainerRef}
        style={{ height: '100px' }}
      />
    </div>

  );
}

export default LoadingAnimationSmall;
