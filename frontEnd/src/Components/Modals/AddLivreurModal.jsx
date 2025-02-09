import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Modal.css'
import { addLivreur } from '../../redux/actions/LivreurAction';
import ModalAnimation from './ModalAnimation';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddLivreurModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsAlertOpen(false);
    };
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
        role: 'LIVREUR',
        address: {
            country: 'Tunisie',
            state: '',
            streetBuilding: '',
        },

    };

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phone: Yup.string().required('Phone is required'),
        userName: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        address: Yup.object().shape({
            state: Yup.string().required('State is required'),
            streetBuilding: Yup.string().required('Street/Building is required'),
        }),
    });
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    const successAdd = async () => {
      openModal();
      await new Promise(resolve => setTimeout(resolve, 3000));
      closeModal();
      onClose();
    };
    const handleSubmit = (values) => {

        const clientData = {
            ...values,
            address: {
                ...values.address,
                latitude: 0,
                longitude: 0
            }
        };
        dispatch(addLivreur(clientData))
            .then(result => {
                if (result) {
                    successAdd();
                }
            })
            .catch(error => {
                console.log('err', error)
                if (error) {
                    setIsAlertOpen(true);
                }
            });
    };
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
            {modalOpen &&
                <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Livreur ajouté avec succès" />
            }
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                open={isAlertOpen}
                autoHideDuration={2000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Erreur d'Ajout Livreur !
                </Alert>
            </Snackbar>
            <div className="modal-content-client">
                <div className='modal-scroll ' style={{ width: "90%", padding: "30px 10px", margin: "auto" }}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form style={{ width: "100%", height: '100%' }}>
                            <div className="mb-3">
                                <div className="culumnFormContainer">
                                    <label className="modal-label-Addguide" htmlFor="firstName">First Name</label>
                                    <Field className="modal-input-Addguide" type="text" name="firstName" />
                                    <ErrorMessage name="firstName" component="span" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="culumnFormContainer">
                                    <label className="modal-label-Addguide" htmlFor="lastName">Last Name</label>
                                    <Field className="modal-input-Addguide" type="text" name="lastName" />
                                    <ErrorMessage name="lastName" component="span" />
                                </div>
                            </div>
                            <div className="culumnFormContainer">
                                <label className="modal-label-Addguide" htmlFor="userName">User Name</label>
                                <Field className="modal-input-Addguide" type="text" name="userName" />
                                <ErrorMessage name="userName" component="div" />
                            </div>
                            <div className="culumnFormContainer">
                                <label className="modal-label-Addguide" htmlFor="email">Email</label>
                                <Field className="modal-input-Addguide" type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div className="culumnFormContainer">
                                <label className="modal-label-Addguide" htmlFor="password">Password</label>
                                <Field className="modal-input-Addguide" type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <div className="mb-3">
                                <div className="culumnFormContainer">
                                    <label className="modal-label-Addguide" htmlFor="phone">Téléphone</label>
                                    <Field className="modal-input-Addguide" type="number" name="phone" />
                                    <ErrorMessage name="phone" component="span" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="culumnFormContainer">
                                    <label className="modal-label-Addguide" htmlFor="address.state">State</label>
                                    <Field className="modal-input-Addguide" type="text" name="address.state" />
                                    <ErrorMessage name="address.state" component="span" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="culumnFormContainer">
                                    <label className="modal-label-Addguide" htmlFor="address.streetBuilding">Street/Building</label>
                                    <Field className="modal-input-Addguide" type="text" name="address.streetBuilding" />
                                    <ErrorMessage name="address.streetBuilding" component="span" />
                                </div>
                            </div>
                            <button className="confirm-btn " type="submit">Confirmer</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddLivreurModal