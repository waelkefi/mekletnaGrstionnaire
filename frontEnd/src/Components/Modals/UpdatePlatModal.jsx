import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Modal.css';
import Select from 'react-select';
import LoadingAnimation from '../animation/LoadingAnimation';
import { updatePlat } from '../../redux/actions/PlatAction';
import ModalAnimation from './ModalAnimation';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdatePlatModal = ({ isOpen, onClose, plat }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const traiteurs = useSelector((state) => state.traiteur.traiteurs);

  useEffect(() => {
    setLoading(false);
  }, []); // Supposons que le chargement soit géré au niveau du composant parent

  const filteredOptions = traiteurs.filter((traiteur) =>
    `${traiteur?.firstName} ${traiteur?.lastName}`
      .toLowerCase()
      .includes(selectedOption ? selectedOption.label.toLowerCase() : '')
  );

  const handleChange = (e, setFieldValue, selectedOption) => {
    setSelectedOption(selectedOption);
    setFieldValue('traiteur', e._id);
  };

  const customStyles = {
    // styles personnalisés pour react-select
  };

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const initialValues = {
    name: plat.name || '',
    price: plat.price || '',
    traiteur: plat.traiteur._id || '', // Supposons que vous avez un ID dans plat.traiteur
    description: plat.description || '',
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    price: Yup.number().required('Le prix est requis'),
    traiteur: Yup.string().required('Le nom du traiteur est requis'),
    description: Yup.string().required('La description est requise'),
    image: Yup.mixed()
      .test('fileType', 'Format de fichier non pris en charge. Le fichier doit être jpg, jpeg, png, gif ou webp.', function (value) {
        if (!value) return true;
        const supportedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        return supportedFileTypes.includes(value.type);
      })
      .test('fileSize', 'La taille du fichier doit être inférieure à 2 Mo', function (value) {
        if (!value) return true;
        return value.size <= 1024 * 1024 * 2;
      }),
  });

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue('image', file);
    }
  };

  const handleSubmit = async (values) => {
    await dispatch(updatePlat(plat._id, values))
      .then((result) => {
        if (result) {
          successUpdate();
        }
      })
      .catch((error) => {
        console.log('err', error);
        if (error) {
          setIsAlertOpen(true);
        }
      });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const successUpdate = async () => {
    openModal();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    closeModal();
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={() => setIsAlertOpen(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Erreur de mise à jour du plat !
        </Alert>
      </Snackbar>
      {modalOpen && <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Plat mis à jour avec succès" />}
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="modal-content-envie">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
                  <Form style={{ width: "100%", height: '100%' }}>
                  <div className="mb-3">
                      <div className="culumnFormContainer">
                          <label className="modal-label-Addguide" htmlFor="name">Plat</label>
                          <Field className="modal-input-Addguide" type="text" name="name" />
                          <ErrorMessage name="name" component="span" />
                      </div>
                  </div>
                  <div className="mb-3">
                      <div className="culumnFormContainer">
                          <label className="modal-label-Addguide" htmlFor="traiteur">Laboratoire/traiteur </label>
                          <Select
                              name="traiteur"
                              value={selectedOption}
                              onChange={(e) => handleChange(e, setFieldValue)}
                              options={filteredOptions}
                              isSearchable
                              onInputChange={(inputValue) => setSelectedOption(inputValue)}
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
                      <div className="culumnFormContainer">
                          <label className="modal-label-Addguide" htmlFor="description">Description</label>
                          <Field className="modal-input-Addguide" type="text" name="description" />
                          <ErrorMessage name="description" component="span" />
                      </div>
                  </div>
                  <div className="mb-3">
                      <div className="culumnFormContainer">
                          <label className="modal-label-Addguide" htmlFor="price">Prix</label>
                          <Field className="modal-input-Addguide" type="number" name="price" />
                          <ErrorMessage name="description" component="span" />
                      </div>
                  </div>
                  <div className="mb-3">
                      <div className="culumnFormContainer">
                          <button type="button" onClick={() => fileInputRef.current.click()}>+</button>
                          <input
                              name='image'
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileChange(e, setFieldValue)}
                          />
                          {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100px', height: '100px' }} />}
                          <ErrorMessage name="image" component="div" />
                      </div>
                  </div>
                  <button type="submit">Ajouter</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default UpdatePlatModal;
