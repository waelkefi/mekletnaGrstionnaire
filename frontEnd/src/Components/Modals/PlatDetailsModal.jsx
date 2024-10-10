import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css'

const PlatDetailsModal = ({ isOpen, onClose, plat }) => {
    const API = process.env.REACT_APP_API_URL_IMAGE;
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmation Modal"
            className="modal-content-Plats"
            appElement={document.getElementById('root')}
        >
            <div className='modal-content-plat-details'>
                <div className="PlatCardImgModal">
                    <img src={`${API}${plat.image}`} alt="imagePlatMekletna.tn" />
                </div>
                <div className="PlatCardTextModal">
                    <h2>{plat.name}</h2>
                    <p> {plat?.description}</p>
                    <h3>{plat.price} €</h3>
                </div>

                <div className='deleteModalBtnsContainer'>
                <button  className='confirm-btn ' onClick={onClose}>fermer</button>
            </div>
            </div>

          
        </Modal>
    );
};

export default PlatDetailsModal;
