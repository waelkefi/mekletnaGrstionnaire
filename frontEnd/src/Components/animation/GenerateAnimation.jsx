import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from './generate.json';

function GenerateAnimation( ) {
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
     
<div
      ref={animationContainerRef}
      style={{  height: '200px' }}
    />
     <p className='text_animation'>Création De Planification 
     <br></br>
     En Cours</p>
    </div>
    
  );
}

export default GenerateAnimation;
