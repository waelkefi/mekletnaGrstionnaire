import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css'
const ModalDeletePesonalise = ({ isOpen, onDelete, onClose, message }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation Modal"
      className="modal-content-envie"
      appElement={document.getElementById('root')}
    >
      <h2 className='deleteModalTitle'>Confirmation de suppression</h2>
      <p className='deleteModalMessage'>{message}</p>
      <div className='deleteModalBtnsContainer'>
        <button className='deleteModalconfirm' onClick={handleDelete}>Oui, supprimer</button>
        <button className='deleteModalReset' onClick={onClose}>Annuler</button>
      </div>

    </Modal>
  );
};

export default ModalDeletePesonalise;
