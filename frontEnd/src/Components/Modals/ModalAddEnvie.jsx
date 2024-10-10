import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Modal.css'
import { fetchAllClient } from '../../redux/actions/ClientAction';
import Select from 'react-select';
import { addEnvie } from '../../redux/actions/EnvieClientAction';
import ModalAnimation from './ModalAnimation';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ModalAddEnvie = ({ isOpen, onClose }) => {
  const customStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      border: isFocused && "1px solid #5E8214",
      '&:hover': {
        borderColor: '#5E8214',
      },
      '&:focus': {
        borderColor: '#5E8214',
      },
      boxShadow: " box-shadow: 0 0 0 1px #5E8214"
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? '#5E8214' : isFocused ? '#5e8214b8' : null,
      color: isSelected ? 'white' : 'black',
    }),
  };
  const dispatch = useDispatch();
  const clients = useSelector(state => state.client.clients);
  const [loading, setLoading] = useState(true);
  const [searchClientInput, setSearchClientInput] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchAllClient())
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filtredClients = clients.filter(client =>
    `${client?.name} - ${client?.phone}`
      .toLowerCase()
      .includes(searchClientInput.toLowerCase())
  );

  const handleClientChange = (e, setFieldValue, selectedOption) => {
    setSelectedClient(selectedOption);
    setFieldValue("client", e._id);
  };


  const initialValues = {
    client: '',
    plat: '',

  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const validationSchema = Yup.object().shape({
    client: Yup.string().required("Le client est requis"),
    plat: Yup.string().required('Last Name is required'),
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
  
    dispatch(addEnvie(values))
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
        <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Envie ajouté avec succès" />
      }
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: "center" }}
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Erreur d'Ajout Envie !
        </Alert>
      </Snackbar>
      <div className="modal-content-envie">
       
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form style={{ width: "100%", height: '100%' }}>
            <div className="mb-3">
                  <div className="culumnFormContainer">
                    <label className="modal-label-Addguide" htmlFor="client">Client</label>
                    <Select
                      name="client"
                      value={selectedClient}
                      onChange={(e) => handleClientChange(e, setFieldValue)}
                      options={filtredClients}
                      isSearchable
                      onInputChange={(inputValue) => setSearchClientInput(inputValue)}
                      placeholder="Sélectionnez un Client"
                      className='gestionContainerHeaderSelect'
                      styles={customStyles}
                      getOptionLabel={(option) => `${option.name} - ${option.phone}`}
                      getOptionValue={(option) => option._id}
                    />
                    <ErrorMessage name="client" component="span" />
                  </div>
                </div>
              <div className="mb-3">
                <div className="culumnFormContainer">
                  <label className="modal-label-Addguide" htmlFor="plat">Plats</label>
                  <Field className="modal-input-Addguide" type="text" name="plat" />
                  <ErrorMessage name="plat" component="span" />
                </div>
              </div>
             
              <button className="confirm-btn " type="submit">Confirmer</button>
            </Form>
          )}
          </Formik>
        
      </div>
    </div>
  );
};

export default ModalAddEnvie;