// import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import Select from 'react-select';
// import LoadingAnimation from '../animation/LoadingAnimation';
// import { fetchAllTraiteur } from '../../redux/actions/TraiteurAction';
// import { fetchAllClient } from '../../redux/actions/ClientAction';
// import { findByTraiteur } from '../../redux/actions/PlatAction';

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const AddCommandeModal = ({ isOpen, onClose }) => {
//     const dispatch = useDispatch();

//     const [loading, setLoading] = useState(true);
//     const [isAlertOpen, setIsAlertOpen] = useState(false);
//     const [selectedTraiteur, setSelectedTraiteur] = useState(null);
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [searchTraiteurInput, setSearchTraiteurInput] = useState('');
//     const [searchClientInput, setSearchClientInput] = useState('');
//     const [searchPlatInput, setSearchPlatInput] = useState('');

//     const traiteurs = useSelector(state => state.traiteur.traiteurs);
//     const clients = useSelector(state => state.client.clients);
//     const plats = useSelector(state => state.plat.plats);

//     const customStyles = {
//         // Your custom styles for Select component
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 await dispatch(fetchAllTraiteur());
//                 await dispatch(fetchAllClient());
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//                 console.log('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleClose = () => {
//         onClose();
//     };

//     const handleOverlayClick = (e) => {
//         if (e.target === e.currentTarget) {
//             handleClose();
//         }
//     };

//     const filteredTraiteurs = traiteurs.filter(traiteur =>
//         `${traiteur?.firstName} ${traiteur?.lastName}`
//             .toLowerCase()
//             .includes(searchTraiteurInput.toLowerCase())
//     );

//     const handleTraiteurChange = (e, setFieldValue, selectedOption) => {
//         setSelectedTraiteur(selectedOption);
//         setFieldValue("traiteur", e._id);
//         dispatch(findByTraiteur(e._id));
//     };

//     const filtredClients = clients.filter(client =>
//         `${client?.firstName} ${client?.lastName}`
//             .toLowerCase()
//             .includes(searchClientInput.toLowerCase())
//     );

//     const handleClientChange = (e, setFieldValue, selectedOption) => {
//         setSelectedClient(selectedOption);
//         setFieldValue("client", e._id);
//     };

//     const filteredPlats = plats.filter(plat =>
//         plat?.name.toLowerCase()
//             .includes(searchPlatInput.toLowerCase())
//     );

//     const initialValues = {
//         // Define your initial values here
//         // ...
//     };

//     const validationSchema = Yup.object().shape({
//         // Define your validation schema here
//         // ...
//     });

//     const handleSubmit = async (values) => {
//         // Handle submit logic
//         // ...
//     };

//     return (
//         <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
//             <Snackbar
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//                 open={isAlertOpen}
//                 autoHideDuration={2000}
//                 onClose={() => setIsAlertOpen(false)}
//             >
//                 <Alert severity="error" sx={{ width: '100%' }}>
//                     Erreur d'Ajout Commande !
//                 </Alert>
//             </Snackbar>
//             {loading ? (
//                 <LoadingAnimation />
//             ) : (
//                 <div className="modal-content-envie">
//                     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//                         {({ setFieldValue }) => (
//                             <Form style={{ width: '100%', height: '100%' }}>
//                                 {/* ... (rest of the form fields) */}
//                                 <div className="mb-3">
//                                     <div className="culumnFormContainer">
//                                         <label className="modal-label-Addguide" htmlFor="plats">Plats</label>
//                                         {platList.map((singlePlat, index) => (
//                                             <div key={index} className="plats">
//                                                 <Select
//                                                     name={`plats[${index}].plat`}
//                                                     value={selectedPlats[index]}
//                                                     onChange={(e) => handlePlatChange(e, setFieldValue, index)}
//                                                     options={filteredPlats}
//                                                     isSearchable
//                                                     onInputChange={(inputValue) => setSearchPlatInput(inputValue)}
//                                                     placeholder="Sélectionnez un plat"
//                                                     className='gestionContainerHeaderSelect'
//                                                     styles={customStyles}
//                                                     getOptionLabel={(option) => `${option.name}`}
//                                                     getOptionValue={(option) => option._id}
//                                                 />
//                                                 <label className="modal-label-Addguide" htmlFor={`plats[${index}].quantity`}>Quantité</label>
//                                                 <Field
//                                                     className="modal-input-Addguide modal-date-time-inpt"
//                                                     type="number"
//                                                     name={`plats[${index}].quantity`}
//                                                 />
//                                                 {platList.length - 1 === index && platList.length < 4 && (
//                                                     <button
//                                                         type="button"
//                                                         onClick={handlePlatAdd}
//                                                         className="add-btn"
//                                                     >
//                                                         <span>Ajouter un Plat</span>
//                                                     </button>
//                                                 )}
//                                                 {platList.length !== 1 && (
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handlePlatRemove(index)}
//                                                         className="remove-btn"
//                                                     >
//                                                         <span>Supprimer</span>
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 {/* ... (rest of the form fields) */}
//                             </Form>
//                         )}
//                     </Formik>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddCommandeModal;
