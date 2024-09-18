import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addClient } from '../../redux/actions/ClientAction';
import Select from 'react-select';
import './Modal.css'
import { findByTraiteur } from '../../redux/actions/PlatAction';
import { addCommande } from '../../redux/actions/CommandeAction';
import ModalAnimation from './ModalAnimation';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddCommandeClientModal({ isOpen, onClose, plat }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [selectedPlats, setSelectedPlats] = useState([]);
    const [searchPlatInput, setSearchPlatInput] = useState('');
    const plats = useSelector(state => state.plat.plats);
    const [platList, setPlatList] = useState([{ plat: plat._id, quantity: 1, remarque: "" }]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(findByTraiteur(plat.traiteur._id))
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
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
        phone: '',
        address: {
            country: 'Tunisie',
            state: '',
            streetBuilding: '',
            latitude: 0,
            longitude: 0
        },
        traiteur: plat.traiteur._id,
        date: selectedDate,
        time: "",
        plats: platList,
        amount: 0

    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phone: Yup.string().required('Phone is required'),
        address: Yup.object().shape({
            state: Yup.string().required('State is required'),
            streetBuilding: Yup.string().required('Street/Building is required'),
        }),
        date: Yup.date().required("La date est requise"),
        time: Yup.string().required("L'heure est requise"),
    });

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



    // const handleSubmit = async (values) => {
    //     try {
    //       await dispatch(addCommande(values))
    //       handleClose();
    //     } catch (error) {
    //       console.error("Erreur lors de la soumission du formulaire :", error);
    //       setIsAlertOpen(true);
    //     }
    //   };


    //   const handleSubmit = (values) => {

    //     const clientData = {
    //         ...values,
    //         address: {
    //             ...values.address,
    //             latitude: 0,
    //             longitude: 0
    //         }
    //     };
    //     dispatch(addClient(clientData))
    //         .then(result => {
    //             if (result) {
    //                 //   dispatch(getAdherantByAmical(user.amical))
    //                 onClose();
    //             }
    //         })
    //         .catch(error => {
    //             console.log('err', error)
    //             if (error) {
    //                 setIsAlertOpen(true);
    //             }
    //         });
    // };




    const filteredPlats = plats.filter(plat =>
        plat?.name.toLowerCase()
            .includes(searchPlatInput.toLowerCase())
    );

    const handlePlatChange = (e, setFieldValue, index) => {
        setFieldValue(`plats[${index}].plat`, e._id);
    };


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
    const handleSubmit = async (values) => {
        try {
            const clientData = {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                address: values.address,
            };
            // Ajouter le client
            const clientResult = await dispatch(addClient(clientData));

            // Utiliser l'ID du client pour créer la commande
            const commandeData = {
                traiteur: plat.traiteur._id,
                date: values.date,
                time: values.time,
                plats: values.plats,
                amount: 0,
                client: clientResult._id,
            };

            // Ajouter la commande
            const commande = await dispatch(addCommande(commandeData))
            if (commande) {
                successAdd();
            }


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
                anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                open={isAlertOpen}
                autoHideDuration={2000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Erreur d'Ajout Client !
                </Alert>
            </Snackbar>

            <div className="modal-content-client">
            <div className='d-flex flex-row align-items-center justify-content-between mb-3'> <h2 className='title-modal-content-client'>Passez votre commande</h2> 
            <button className='btnClose-modal-content-client' onClick={()=>onClose()}>X</button></div>  
                <div className='modal-scroll modallllll' style={{ padding: "20px 40px !important", margin: "auto" }}>
                  
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ setFieldValue }) => (
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
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <label className="modal-label-Addguide" htmlFor="date">Date et heure de livraison souhaitées*</label>
                                        <div className="dateTimeContainer">
                                            <div className='date-section'>
                                                <Field className="modal-input-Addguide modal-date-time-inpt" type="date" name="date"   />
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
                                    <label className="modal-label-Addguide mb-3" htmlFor="plats">Ajouter les Plats</label>
                                    {platList.map((singlePlat, index) => (
                                        <div key={index} className="plats-section">
                                            <div className='plat-section-input-container'>
                                                <div className='slect-plat-section'>
                                                    <label className="modal-label-Addguide" htmlFor={`plats[${index}].plat`}>Plats</label>
                                                    {
                                                        index == 0 ? <p>{plat.name}</p> : <Select
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
                                                    }

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
                                <button className="confirm-btn " type="submit">Confirmer</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddCommandeClientModal