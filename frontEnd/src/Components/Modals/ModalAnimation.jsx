import React from 'react';
import './Modal.css';
import LottieAnimation from '../animation/LottieAnimation';

const ModalAnimation = ({ isOpen, onClose, message }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content-animation">
         <p className='messageModal'>{message}</p>
      <LottieAnimation />
      </div>
    </div>
  );
};

export default ModalAnimation;