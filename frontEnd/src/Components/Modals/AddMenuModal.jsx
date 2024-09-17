// import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import './Modal.css';
// import { fetchAllTraiteur } from '../../redux/actions/TraiteurAction';
// import Select from 'react-select';
// import LoadingAnimation from '../animation/LoadingAnimation';
// import { addPlat } from '../../redux/actions/PlatAction';
// // import LottieAnimation from '../animation/LottieAnimation';
// import ModalAnimation from './ModalAnimation';
// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const AddMenuModal = ({ isOpen, onClose }) => {
//     const dispatch = useDispatch();
//     const fileInputRef = useRef(null);
//     const [loading, setLoading] = useState(true)
//     const [isAlertOpen, setIsAlertOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [searchInput, setSearchInput] = useState('');
//     const traiteurs = useSelector(state => state.traiteur.traiteurs)
//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//                 setLoading(true)

//                 await dispatch(fetchAllTraiteur())

//                 setLoading(false)
//             } catch (error) {
//                 setLoading(false)
//                 console.log('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);


//     const plats = useSelector(state => state.plat.plats);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 await dispatch(getAllPlats());
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//                 console.log('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);
//     const filteredPlats = plats.filter(plat =>
//         selectedOption && selectedOption._id !== 'tous' ? plat.traiteur._id === selectedOption._id : true
//     );

//     const filteredOptions = traiteurs.filter(traiteur =>
//         `${traiteur?.firstName} ${traiteur?.lastName}`
//             .toLowerCase()
//             .includes(searchInput.toLowerCase())
//     );



//     const handleChange = (e, setFieldValue, selectedOption) => {
//         setSelectedOption(selectedOption);
//         setFieldValue("traiteur", e._id);
//     };

//     const customStyles = {
//         control: (styles, { isFocused, isSelected }) => ({
//             ...styles,

//             // width: '300px',
//             border: isFocused && "1px solid #5E8214",
//             '&:hover': {
//                 borderColor: '#5E8214',

//             },
//             '&:focus': {
//                 borderColor: '#5E8214',

//             },
//             boxShadow: " box-shadow: 0 0 0 1px #5E8214"
//         }),
//         option: (styles, { isFocused, isSelected }) => ({
//             ...styles,
//             backgroundColor: isSelected ? '#5E8214' : isFocused ? '#5e8214b8' : null,
//             color: isSelected ? 'white' : 'black',
//         }),
//     };

//     const handleClose = () => {
//         onClose();
//     };

//     const handleOverlayClick = (e) => {
//         if (e.target === e.currentTarget) {
//             handleClose();
//         }
//     };

//     const initialValues = {
//         name: '',
//         price: '',
//         traiteur: '',
//         description: '',
//         image: null,
//     };

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().required('Le nom est requis'),
//         price: Yup.number().required('Le prix est requis'),
//         traiteur: Yup.string().required('Le nom du traiteur est requis'),
//         description: Yup.string().required('La description est requise'),
//         image: Yup.mixed()
//             .required('Une image est requise')
//             .test('fileType', 'Format de fichier non pris en charge. Le fichier doit être jpg, jpeg, png, gif ou webp.', function (value) {
//                 if (!value) return true;
//                 const supportedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//                 return supportedFileTypes.includes(value.type);
//             })
//             .test('fileSize', 'La taille du fichier doit être inférieure à 2 Mo', function (value) {
//                 if (!value) return true;
//                 return value.size <= 1024 * 1024 * 2;
//             }),
//     });

//     const handleFileChange = (e, setFieldValue) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSelectedImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//             setFieldValue("image", file);
//         }
//     };

//     const handleSubmit = async (values) => {
//         await dispatch(addPlat(values))
//             .then(result => {
//                 if (result) {
//                     successAdd()
//                 }
//             })
//             .catch(error => {
//                 console.log('err', error)
//                 if (error) {
//                     setIsAlertOpen(true);
//                 }
//             });
//     };
//     const [modalOpen, setModalOpen] = useState(false);
//     const openModal = () => {
//         setModalOpen(true);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//     };

//     const successAdd = async () => {
//         openModal();
//         await new Promise(resolve => setTimeout(resolve, 3000));
//         closeModal();
//         onClose();
//     };
//     return (
//         <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
//             <Snackbar
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//                 open={isAlertOpen}
//                 autoHideDuration={2000}
//                 onClose={() => setIsAlertOpen(false)}>
//                 <Alert severity="error" sx={{ width: '100%' }}>
//                     Erreur d'Ajout Palt !
//                 </Alert>
//             </Snackbar>
//             {modalOpen &&
//                 <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Plat ajouté avec succès" />
//             }
//             {loading ? <LoadingAnimation /> :
//                 <div className="modal-content-envie">
//                     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//                         {({ setFieldValue }) => (
//                             <Form style={{ width: "100%", height: '100%' }}>
//                                 <div className="mb-3">
//                                     <div className="culumnFormContainer">
//                                         <label className="modal-label-Addguide" htmlFor="traiteur">Laboratoire/traiteur </label>
//                                         <Select
//                                             name="traiteur"
//                                             value={selectedOption}
//                                             onChange={(e) => handleChange(e, setFieldValue)}
//                                             options={filteredOptions}
//                                             isSearchable
//                                             onInputChange={(inputValue) => setSearchInput(inputValue)}
//                                             placeholder="Sélectionnez un Traiteur"
//                                             className='gestionContainerHeaderSelect'
//                                             styles={customStyles}
//                                             getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
//                                             getOptionValue={(option) => option._id}
//                                         />
//                                         <ErrorMessage name="traiteur" component="span" />
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <div className="culumnFormContainer">
//                                         <label className="modal-label-Addguide" htmlFor="name">Nom Menu</label>
//                                         <Field className="modal-input-Addguide" type="text" name="name" />
//                                         <ErrorMessage name="name" component="span" />
//                                     </div>
//                                 </div>

//                                 <div className="mb-3">
//                                     <div className="culumnFormContainer">
//                                         <label className="modal-label-Addguide" htmlFor="description">Description</label>
//                                         <Field className="modal-input-Addguide" type="text" name="description" />
//                                         <ErrorMessage name="description" component="span" />
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <div className="culumnFormContainer">
//                                         <label className="modal-label-Addguide" htmlFor="price">Prix</label>
//                                         <Field className="modal-input-Addguide" type="number" name="price" />
//                                         <ErrorMessage name="description" component="span" />
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <div className="culumnFormContainer">
//                                         <label className="modal-label-Addguide" htmlFor="price"> Photo De Plat</label>
//                                         <button className='upload-img-plat-btn' type="button" onClick={() => fileInputRef.current.click()}>
//                                             {selectedImage ? <img src={selectedImage} alt="Selected" style={{ width: '42px', height: '42px' }} /> : <svg xmlns="http://www.w3.org/2000/svg" width="42.896" height="42.896" viewBox="0 0 42.896 42.896">
//                                                 <g id="image" transform="translate(8.962 7.345)">
//                                                     <g id="Ellipse_260" data-name="Ellipse 260" transform="translate(-8.962 -7.345)" fill="#fff" stroke="#aa0102" strokeWidth="1">
//                                                         <circle cx="21.448" cy="21.448" r="21.448" stroke="none" />
//                                                         <circle cx="21.448" cy="21.448" r="20.948" fill="none" />
//                                                     </g>
//                                                     <path id="Tracé_1180" data-name="Tracé 1180" d="M60.25,106.145a29.084,29.084,0,0,1-2.738-1.271c-1.081-.513-1.233-1.683-1.3-2.764a9.877,9.877,0,0,0,.029,3.432,2.594,2.594,0,0,0,1.115,1.824.5.5,0,0,1,.185.344c-.159,2.22.352,2.67.982,4.645a1.844,1.844,0,0,1-.11,1.313c-.018.048-.037.1-.057.145h0a2.712,2.712,0,0,1-2.546,1.7,3.089,3.089,0,0,1-.579-.057c0-.033-.009-.068-.015-.1.022-.026.042-.053.064-.077-.557.65-1.251,1.383-1.639,1.788a2.93,2.93,0,0,0,3.273.793c.02-.007.04-.015.059-.024l.073-.033a2.753,2.753,0,0,0,1.579-2v-.007c.015-.071.026-.145.035-.218a31.66,31.66,0,0,0,.152-3.927c1.423.626,3.194.714,4.062,2.136a9.32,9.32,0,0,0-.084-2.844c.081-2.02-.43-4.013-2.537-4.8Zm1.694,3.866a2.564,2.564,0,0,1,.126.264c-1.564-.707-3.628-.822-4.3-2.617,1.009.482,1.927.839,2.934,1.262a2.658,2.658,0,0,1,1.24,1.092Z" transform="translate(-44.192 -88.103)" fill="#aa0102" />
//                                                     <path id="Tracé_1181" data-name="Tracé 1181" d="M12.915,107.625a29.2,29.2,0,0,1-.269-3.007c-.1-1.194.839-1.91,1.742-2.509a9.9,9.9,0,0,0-2.958,1.74,2.6,2.6,0,0,0-1.022,1.877.506.506,0,0,1-.2.333c-2,.971-2.136,1.639-3.533,3.174a1.846,1.846,0,0,1-1.192.562c-.053.009-.1.015-.156.022h0a2.71,2.71,0,0,1-2.74-1.357,2.977,2.977,0,0,1-.24-.531c.026-.022.055-.042.081-.064l.1.015c-.841-.159-1.824-.392-2.368-.524a2.932,2.932,0,0,0,.949,3.231c.015.013.033.026.051.04l.064.046a2.76,2.76,0,0,0,2.52.37.008.008,0,0,0,.007,0,1.994,1.994,0,0,0,.207-.079,31.687,31.687,0,0,0,3.478-1.833c.17,1.544.978,3.123.181,4.586a9.222,9.222,0,0,0,2.421-1.5c1.791-.941,3.26-2.379,2.885-4.595Zm-2.5,3.4a2.407,2.407,0,0,1-.165.24c-.17-1.707-1.1-3.553.117-5.033.086,1.115.236,2.088.374,3.172a2.645,2.645,0,0,1-.326,1.619Z" transform="translate(-2.37 -88.103)" fill="#aa0102" />
//                                                     <path id="Tracé_1182" data-name="Tracé 1182" d="M10.174,69.242a29.08,29.08,0,0,1,2.469-1.736c.985-.681,2.073-.227,3.044.255A9.911,9.911,0,0,0,12.7,66.071a2.6,2.6,0,0,0-2.136.053.505.505,0,0,1-.392-.011c-1.841-1.247-2.489-1.029-4.515-1.474a1.846,1.846,0,0,1-1.081-.751c-.033-.04-.066-.081-.1-.123h0a2.711,2.711,0,0,1-.2-3.053,3.012,3.012,0,0,1,.339-.474l.095.04c.013.031.024.064.035.095-.284-.808-.573-1.775-.729-2.313A2.931,2.931,0,0,0,1.7,60.5a.558.558,0,0,0-.009.064c0,.026-.007.053-.009.077A2.754,2.754,0,0,0,2.619,63s0,0,0,0c.055.048.112.095.172.141a31.323,31.323,0,0,0,3.326,2.095c-1.253.918-2.216,2.41-3.881,2.449a9.276,9.276,0,0,0,2.5,1.348c1.709,1.079,3.689,1.634,5.423.2ZM5.98,68.776c-.084,0-.17-.013-.291-.022,1.394-1,2.524-2.731,4.416-2.416-.923.632-1.689,1.249-2.559,1.912a2.653,2.653,0,0,1-1.564.529Z" transform="translate(-3.666 -53.756)" fill="#aa0102" />
//                                                     <path id="Tracé_1183" data-name="Tracé 1183" d="M37.431,41.617a29.091,29.091,0,0,1,2.738,1.271c1.081.513,1.233,1.683,1.3,2.764a9.877,9.877,0,0,0-.029-3.432A2.594,2.594,0,0,0,40.325,40.4a.5.5,0,0,1-.185-.344c.159-2.22-.352-2.67-.982-4.645a1.844,1.844,0,0,1,.11-1.313c.018-.048.037-.1.057-.145h0a2.712,2.712,0,0,1,2.546-1.7,3.091,3.091,0,0,1,.579.057c0,.033.009.068.015.1-.022.026-.042.053-.064.077.557-.65,1.251-1.383,1.639-1.788a2.93,2.93,0,0,0-3.273-.793c-.02.007-.04.015-.059.024l-.073.033a2.753,2.753,0,0,0-1.579,2v.007c-.015.07-.026.145-.035.218a31.66,31.66,0,0,0-.152,3.927c-1.423-.626-3.194-.714-4.062-2.137a9.32,9.32,0,0,0,.084,2.844c-.081,2.02.43,4.013,2.537,4.8Zm-1.694-3.866a2.566,2.566,0,0,1-.126-.264c1.564.707,3.628.822,4.3,2.617-1.009-.482-1.927-.839-2.934-1.262a2.658,2.658,0,0,1-1.24-1.092Z" transform="translate(-29.447 -31.646)" fill="#aa0102" />
//                                                     <path id="Tracé_1184" data-name="Tracé 1184" d="M66.8,55.51a29.192,29.192,0,0,1,.269,3.007c.1,1.194-.839,1.91-1.742,2.509a9.9,9.9,0,0,0,2.958-1.74,2.6,2.6,0,0,0,1.022-1.877.506.506,0,0,1,.2-.333c2-.971,2.137-1.639,3.533-3.174a1.846,1.846,0,0,1,1.192-.562c.053-.009.1-.015.156-.022h0a2.71,2.71,0,0,1,2.74,1.357,2.978,2.978,0,0,1,.24.531c-.026.022-.055.042-.081.064l-.1-.015c.841.159,1.824.392,2.368.524a2.932,2.932,0,0,0-.949-3.231c-.015-.013-.033-.026-.051-.04l-.064-.046a2.76,2.76,0,0,0-2.52-.37.008.008,0,0,0-.007,0,1.992,1.992,0,0,0-.207.079,31.687,31.687,0,0,0-3.478,1.833c-.17-1.544-.978-3.123-.181-4.586a9.223,9.223,0,0,0-2.421,1.5c-1.791.94-3.26,2.379-2.885,4.595Zm2.5-3.4a2.406,2.406,0,0,1,.165-.24c.17,1.707,1.1,3.553-.117,5.033-.086-1.114-.236-2.088-.374-3.172a2.645,2.645,0,0,1,.326-1.619Z" transform="translate(-53.307 -47.019)" fill="#aa0102" />
//                                                     <path id="Tracé_1185" data-name="Tracé 1185" d="M70.833,92.334a29.074,29.074,0,0,1-2.469,1.736c-.985.681-2.073.227-3.044-.255a9.912,9.912,0,0,0,2.987,1.692,2.6,2.6,0,0,0,2.136-.053.505.505,0,0,1,.392.011c1.841,1.247,2.489,1.029,4.515,1.474a1.846,1.846,0,0,1,1.081.751c.033.04.066.082.1.123h0a2.711,2.711,0,0,1,.2,3.053,3.013,3.013,0,0,1-.339.474l-.095-.04c-.013-.031-.024-.064-.035-.095.284.808.573,1.775.729,2.313a2.931,2.931,0,0,0,2.324-2.438.555.555,0,0,0,.009-.064c0-.026.007-.053.009-.077a2.753,2.753,0,0,0-.938-2.366s0,0,0,0c-.055-.048-.112-.095-.172-.141a31.322,31.322,0,0,0-3.326-2.095c1.253-.918,2.216-2.41,3.881-2.449a9.276,9.276,0,0,0-2.5-1.348c-1.709-1.079-3.689-1.634-5.423-.2Zm4.194.467c.084,0,.17.013.291.022-1.394,1-2.524,2.731-4.416,2.416.923-.632,1.689-1.249,2.559-1.912a2.653,2.653,0,0,1,1.564-.529Z" transform="translate(-53.299 -79.807)" fill="#aa0102" />
//                                                 </g>
//                                             </svg>
//                                             }
//                                             <p>ajouter une image</p> <svg xmlns="http://www.w3.org/2000/svg" width="18.429" height="16.429" viewBox="0 0 18.429 16.429">
//                                                 <g id="Icon_feather-upload" data-name="Icon feather-upload" transform="translate(-3.5 -5.5)">
//                                                     <path id="Tracé_2848" data-name="Tracé 2848" d="M20.929,22.5v3.651A1.825,1.825,0,0,1,19.1,27.976H6.325A1.825,1.825,0,0,1,4.5,26.151V22.5" transform="translate(0 -7.048)" fill="none" stroke="#343434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                                                     <path id="Tracé_2849" data-name="Tracé 2849" d="M19.627,9.064,15.064,4.5,10.5,9.064" transform="translate(-2.349 2)" fill="none" stroke="#343434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                                                     <path id="Tracé_2850" data-name="Tracé 2850" d="M18,4.5V15.452" transform="translate(-5.286 2)" fill="none" stroke="#343434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                                                 </g>
//                                             </svg>
//                                         </button>
//                                         <input
//                                             name='image'
//                                             type="file"
//                                             accept="image/*"
//                                             ref={fileInputRef}
//                                             style={{ display: 'none' }}
//                                             onChange={(e) => handleFileChange(e, setFieldValue)}
//                                         />

//                                         <ErrorMessage name="image" component="span" />
//                                     </div>
//                                 </div>
//                                 <button className='confirm-btn ' type="submit">Ajouter</button>
//                             </Form>
//                         )}
//                     </Formik>
//                 </div>
//             }
//         </div>
//     );
// };

// export default AddMenuModal;
