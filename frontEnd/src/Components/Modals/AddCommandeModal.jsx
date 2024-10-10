import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from 'react-select';
import LoadingAnimation from '../animation/LoadingAnimation';
import { fetchAllTraiteur } from '../../redux/actions/TraiteurAction';
import { fetchAllClient } from '../../redux/actions/ClientAction';
import { findByTraiteur } from '../../redux/actions/PlatAction';
import { addCommande } from '../../redux/actions/CommandeAction';
import ModalAnimation from './ModalAnimation';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCommandeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedTraiteur, setSelectedTraiteur] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPlats, setSelectedPlats] = useState([]);
  const [searchTraiteurInput, setSearchTraiteurInput] = useState('');
  const [searchClientInput, setSearchClientInput] = useState('');
  const [searchPlatInput, setSearchPlatInput] = useState('');

  const traiteurs = useSelector(state => state.traiteur.traiteurs);
  const clients = useSelector(state => state.client.clients);
  const plats = useSelector(state => state.plat.plats);

  const [platList, setPlatList] = useState([{ plat: "", quantity: "", remarque: "" }]);

  const handlePlatRemove = (index) => {
    const list = [...platList];
    list.splice(index, 1);
    setPlatList(list);
  };

  const handlePlatAdd = () => {
    setPlatList([...platList, { plat: "", quantity: 0, remarque: "" }]);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchAllTraiteur())
        await dispatch(fetchAllClient())
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const filteredTraiteurs = traiteurs.filter(traiteur =>
    `${traiteur?.firstName} ${traiteur?.lastName}`
      .toLowerCase()
      .includes(searchTraiteurInput.toLowerCase())
  );

  const handleTraiteurChange = (e, setFieldValue, selectedOption) => {
    setSelectedTraiteur(selectedOption);
    setFieldValue("traiteur", e._id);
    dispatch(findByTraiteur(e._id))
  };

  const filtredClients = clients.filter(client =>
    `${client?.name}`
      .toLowerCase()
      .includes(searchClientInput.toLowerCase())
  );

  const handleClientChange = (e, setFieldValue, selectedOption) => {
    setSelectedClient(selectedOption);
    setFieldValue("client", e._id);
  };

  const filteredPlats = plats.filter(plat =>
    plat?.name.toLowerCase()
      .includes(searchPlatInput.toLowerCase())
  );

  const handlePlatChange = (e, setFieldValue, index) => {
    setFieldValue(`plats[${index}].plat`, e._id);
  };

  const initialValues = {
    traiteur: "",
    client: "",
    date: "",
    time: "",
    plats: platList,
    amount: 62
  };

  const validationSchema = Yup.object().shape({
    traiteur: Yup.string().required("Le traiteur est requis"),
    client: Yup.string().required("Le client est requis"),
    date: Yup.date().required("La date est requise"),
    time: Yup.string().required("L'heure est requise"),
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
    handleClose();
  };
  const handleSubmit = async (values) => {
    try {
      await dispatch(addCommande(values)).then(result => {
        if (result) {
          successAdd();
        }
      })

    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      setIsAlertOpen(true);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      {modalOpen &&
        <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Commande ajouté avec succès" />
      }
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={() => setIsAlertOpen(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Erreur d'Ajout Commande !
        </Alert>
      </Snackbar>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="modal-content-envie">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
              <Form style={{ width: '100%', height: '100%' }}>
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
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => option._id}
                    />
                    <ErrorMessage name="client" component="span" />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="culumnFormContainer">
                    <label className="modal-label-Addguide" htmlFor="date">Date et heure de livraison souhaitées*</label>
                    <div className="dateTimeContainer">
                      <div className='date-section'>
                        <Field className="modal-input-Addguide modal-date-time-inpt" type="date" name="date" />
                        <ErrorMessage name="date" component="span" />
                      </div>
                      <div className='time-section'>
                        <Field className="modal-input-Addguide" type="time" name="time" />
                        <ErrorMessage name="time" component="span" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="culumnFormContainer">
                    <label className="modal-label-Addguide" htmlFor="traiteur">Laboratoire/traiteur</label>
                    <Select
                      name="traiteur"
                      value={selectedTraiteur}
                      onChange={(e) => handleTraiteurChange(e, setFieldValue)}
                      options={filteredTraiteurs}
                      isSearchable
                      onInputChange={(inputValue) => setSearchTraiteurInput(inputValue)}
                      placeholder="Sélectionnez un Traiteur"
                      className='gestionContainerHeaderSelect'
                      styles={customStyles}
                      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                      getOptionValue={(option) => option._id}
                    />
                    <ErrorMessage name="traiteur" component="span" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="modal-label-Addguide mb-3" htmlFor="plats">Ajouter les Plats</label>
                  {platList.map((singlePlat, index) => (
                    <div key={index} className="plats-section">
                      <div className='plat-section-input-container'>
                        <div className='slect-plat-section'>
                          <label className="modal-label-Addguide" htmlFor={`plats[${index}].plat`}>Plats</label>
                          <Select
                            name={`plats[${index}].plat`}
                            value={selectedPlats[index]}
                            onChange={(e) => handlePlatChange(e, setFieldValue, index)}
                            options={filteredPlats}
                            isSearchable
                            onInputChange={(inputValue) => setSearchPlatInput(inputValue)}
                            placeholder="Sélectionnez un plat"
                            className='gestionContainerHeaderSelect'
                            styles={customStyles}
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => option._id}
                          />
                        </div>
                        <div className='quantity-plat-section'>
                          <label className="modal-label-Addguide" htmlFor={`plats[${index}].quantity`}>Quantité</label>
                          <Field
                            className="modal-input-Addguide "
                            type="number"
                            name={`plats[${index}].quantity`}
                          />
                        </div>
                        <div className='remarque-plat-section'>
                          <label
                            className="modal-label-Addguide"
                            htmlFor={`plats[${index}].remarque`}
                          >
                            Remarque
                          </label>
                          <Field
                            className="modal-input-Addguide modal-date-time-inpt"
                            type="text"
                            name={`plats[${index}].remarque`}
                          />
                          <ErrorMessage name={`plats[${index}].remarque`} component="span" />
                        </div>
                      </div>
                      {platList.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handlePlatRemove(index)}
                          className="remove-btn-plats-section"
                        >
                          <span>X</span>
                        </button>
                      )}
                    </div>
                  ))}
                  {platList.length < 4 && (
                    <button
                      type="button"
                      onClick={handlePlatAdd}
                      className="add-btn-plats-section"
                    >
                      <span>Ajouter un Plat</span>
                    </button>
                  )}
                </div>
                <button className='confirm-btn ' type='submit'>valider</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AddCommandeModal;
