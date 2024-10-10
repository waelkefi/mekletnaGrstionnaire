import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addClient } from '../../redux/actions/ClientAction';
import './Modal.css'
import ModalAnimation from './ModalAnimation';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ModalAddClient = ({ isOpen, onClose }) => {
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
    name: '',
    phone: '',
    address: {
      country: 'Tunisie',
      state: '',
      streetBuilding: '',
    },

  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est réquis'),
    phone: Yup.string().required('Le téléphone est réquis'),
    address: Yup.object().shape({
      state: Yup.string().required('La cité est réquise'),
      streetBuilding: Yup.string().required('La rue est réquise'),
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
    dispatch(addClient(clientData))
      .then(result => {
        if (result) {
          successAdd()
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
        <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Client ajouté avec succès" />
      }
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: "center" }}
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Erreur d'Ajout Client !
        </Alert>
      </Snackbar>
      <div className="modal-content-client">
        <div className='modal-scroll ' style={{ width: "90%", padding: "30px 10px", margin: "auto" }}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form style={{ width: "100%", height: '100%' }}>
              <div className="mb-3">
                <div className="culumnFormContainer">
                  <label className="modal-label-Addguide" htmlFor="name">Nom</label>
                  <Field className="modal-input-Addguide" type="text" name="name" />
                  <ErrorMessage name="name" component="span" />
                </div>
              </div>
              {/* <div className="mb-3">
                <div className="culumnFormContainer">
                  <label className="modal-label-Addguide" htmlFor="lastName">Last Name</label>
                  <Field className="modal-input-Addguide" type="text" name="lastName" />
                  <ErrorMessage name="lastName" component="span" />
                </div>
              </div> */}
              <div className="mb-3">
                <div className="culumnFormContainer">
                  <label className="modal-label-Addguide" htmlFor="phone">Téléphone</label>
                  <Field className="modal-input-Addguide" type="number" name="phone" />
                  <ErrorMessage name="phone" component="span" />
                </div>
              </div>
              <div className="mb-3">
                <div className="culumnFormContainer">
                  <label className="modal-label-Addguide" htmlFor="address.state">ville</label>
                  <Field className="modal-input-Addguide" type="text" name="address.state" />
                  <ErrorMessage name="address.state" component="span" />
                </div>
              </div>
              <div className="mb-3">
                <div className="culumnFormContainer">
                  <label className="modal-label-Addguide" htmlFor="address.streetBuilding">Rue</label>
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
  );
};

export default ModalAddClient;