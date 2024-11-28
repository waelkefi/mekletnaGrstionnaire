import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Modal.css';
import Select from 'react-select';
import LoadingAnimation from '../animation/LoadingAnimation';
import { updatePlat, updatePlatImage } from '../../redux/actions/PlatAction';
import ModalAnimation from './ModalAnimation';
const API = process.env.REACT_APP_API_URL_IMAGE;
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
console.log('plat', plat)
  useEffect(() => {
    setLoading(false);
    if (plat && plat.traiteur) {
      const traiteur = traiteurs.find(t => t._id === plat.traiteur._id);
      if (traiteur) setSelectedOption({ value: traiteur._id, label: `${traiteur.firstName} ${traiteur.lastName}` });
      // Display the existing image, if available
      // if (plat.image) setSelectedImage(plat.image);
    }
  }, [plat, traiteurs])

  const handleChange = (selectedOption, setFieldValue) => {
    setSelectedOption(selectedOption);
    setFieldValue('traiteur', selectedOption ? selectedOption.value : '');
  };

  const customStyles = {
    // Personnalisation pour react-select si nécessaire
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
    traiteur: plat.traiteur?._id || '',
    description: plat.description || '',
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    price: Yup.number().required('Le prix est requis'),
    traiteur: Yup.string().required('Le traiteur est requis'),
    description: Yup.string().required('La description est requise'),
    // image: Yup.mixed()
    //   .test('fileType', 'Format de fichier non pris en charge', function (value) {
    //     if (!value) return true;
    //     const supportedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    //     return supportedFileTypes.includes(value.type);
    //   })
    //   .test('fileSize', 'La taille du fichier doit être inférieure à 2 Mo', function (value) {
    //     if (!value) return true;
    //     return value.size <= 1024 * 1024 * 2;
    //   }),
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
    console.log('val', values)
    try {
      if(selectedImage) {
        await dispatch(updatePlatImage(plat._id, values))
      }
      else {
        await dispatch(updatePlat(plat._id, values));
        successUpdate();
      }
     
    } catch (error) {
      console.error('Erreur de mise à jour :', error);
      setIsAlertOpen(true);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const successUpdate = async () => {
    openModal();
    await new Promise(resolve => setTimeout(resolve, 3000));
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
                      onChange={(option) => handleChange(option, setFieldValue)}
                      options={traiteurs.map(traiteur => ({
                        value: traiteur._id,
                        label: `${traiteur.firstName} ${traiteur.lastName}`
                      }))}
                      placeholder="Sélectionnez un Traiteur"
                      className="gestionContainerHeaderSelect"
                      styles={customStyles}
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
                    <label className="modal-label-Addguide" htmlFor="price"> Photo De Plat</label>
                    <button className='upload-img-plat-btn' type="button" onClick={() => fileInputRef.current.click()}>
                      {selectedImage ? <img src={selectedImage} alt="Selected" style={{ width: '42px', height: '42px' }} /> : 
                      plat.image && <img src={`${API}${plat.image}`} alt="imagePlatMekletna.tn" style={{ width: '42px', height: '42px' }} />
                      }
                      <p>ajouter une image</p> <svg xmlns="http://www.w3.org/2000/svg" width="18.429" height="16.429" viewBox="0 0 18.429 16.429">
                        <g id="Icon_feather-upload" data-name="Icon feather-upload" transform="translate(-3.5 -5.5)">
                          <path id="Tracé_2848" data-name="Tracé 2848" d="M20.929,22.5v3.651A1.825,1.825,0,0,1,19.1,27.976H6.325A1.825,1.825,0,0,1,4.5,26.151V22.5" transform="translate(0 -7.048)" fill="none" stroke="#343434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path id="Tracé_2849" data-name="Tracé 2849" d="M19.627,9.064,15.064,4.5,10.5,9.064" transform="translate(-2.349 2)" fill="none" stroke="#343434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path id="Tracé_2850" data-name="Tracé 2850" d="M18,4.5V15.452" transform="translate(-5.286 2)" fill="none" stroke="#343434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </g>
                      </svg>
                    </button>
                    <input
                      name='image'
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />

                    <ErrorMessage name="image" component="span" />
                  </div>
                </div>
                <button type="submit" className='confirm-btn'>Modifier</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default UpdatePlatModal;
