import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from './empty.json';

function EmptyAnimation( {text}) {
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
    <div style={{display: "flex", flexDirection : "column", alignItems :"center" , justifyContent : "center" , width : "100%" , marginTop :20}}>
      <p style={{color :"rgba(112,112,112,0.76"}}>{text}</p>
<div
      ref={animationContainerRef}
      style={{  height: '250px' }}
    />
    </div>
    
  );
}

export default EmptyAnimation;
