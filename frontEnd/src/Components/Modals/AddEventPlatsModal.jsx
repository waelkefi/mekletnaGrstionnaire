import React, { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Modal.css';
import LoadingAnimation from '../animation/LoadingAnimation';
import ModalAnimation from './ModalAnimation';
import AddPlatPrincipalForm from '../Menu/AddPlatPrincipalForm';
import AddGarnitures from '../Menu/AddGarnitures';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddEventPlatsModal = ({ isOpen, onClose }) => {

    const [loading, setLoading] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [PpActice, setPpActive] = useState(true)

    const handleClose = () => {
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

   
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isAlertOpen}
                autoHideDuration={2000}
                onClose={() => setIsAlertOpen(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Erreur d'Ajout Plat !
                </Alert>
            </Snackbar>
           
            {loading ? <LoadingAnimation /> :
                <div className="modal-content-envie">
                    <div className='filter-btns-addEventPlats'>
                        <button  className={PpActice ? "activeP" : ""}  onClick={() => setPpActive(true)}>Ajouter Plat Principal</button>
                        <button className={!PpActice ? "activeP" : ""} onClick={() => setPpActive(false)}>Ajouter garnitue</button>
                    </div>

                    {
                        PpActice ?
                            <AddPlatPrincipalForm onClose={onClose} />
                            :
                            <AddGarnitures  onClose={onClose}/>

                    }

                </div>
            }
        </div>
    );
};

export default AddEventPlatsModal;
