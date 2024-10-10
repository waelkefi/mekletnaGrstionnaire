import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../../Components/animation/LoadingAnimation';
import CardPlat from '../../Pages/Menu/CardPlat';
import imagePlat from "../../images/plat.png"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import AddEventPlatsModal from '../../Components/Modals/AddEventPlatsModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlatsAccompagnement } from '../../redux/actions/AccompagnementAction';
import { getAllPlatsPrincipal } from '../../redux/actions/PlatPrincipalAction';
import { addCommande } from '../../redux/actions/CommandeEventActions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ModalAnimation from '../../Components/Modals/ModalAnimation';
import SectionHeader from './SectionHeader';
import SectionHeader2 from './SectionHeader2';
import EmptyAnimation from '../animation/EmptyAnimation';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function EventPalanner() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [modalOpenAddPlat, setModalOpenAddPlat] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dishes = useSelector(state => state.platPrincipal.platsPrincipaux)
    const sideDishes = useSelector(state => state.platAccompagnement.platsAccompagnement)
    const [selectedDish, setSelectedDish] = useState(null);
    const [selectedSideDishes, setSelectedSideDishes] = useState([]);
    const [dishImage, setDishImage] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)

                await dispatch(getAllPlatsPrincipal())
                await dispatch(getAllPlatsAccompagnement())

                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleSelectDish = (dish) => {
        if (!selectedDish) {
            setSelectedDish(dish);
            setDishImage(dish.image);
            setTotalPrice(dish.price);
            setSelectedSideDishes([]);
        } else {
            alert("Vous avez déjà sélectionné un plat principal. Veuillez le retirer pour en choisir un autre.");
        }
    };

    const handleRemoveDish = () => {
        setSelectedDish(null);
        setDishImage("");
        setTotalPrice(0);
        setSelectedSideDishes([]);
    };

    const handleAddSideDish = (sideDish) => {
        if (!selectedSideDishes.includes(sideDish)) {
            setSelectedSideDishes([...selectedSideDishes, sideDish]);
            setTotalPrice(totalPrice + sideDish.price);
        }
    };

    const handleRemoveSideDish = (sideDishId) => {
        const updatedSideDishes = selectedSideDishes.filter((sideDish) => sideDish._id !== sideDishId);
        const removedSideDish = selectedSideDishes.find((sideDish) => sideDish._id === sideDishId);
        setSelectedSideDishes(updatedSideDishes);
        setTotalPrice(totalPrice - removedSideDish.price);
    };

    const filteredSideDishes = selectedDish
        ? sideDishes.filter((sideDish) =>
            sideDish.compatibleDishes.some((compatibleDish) => compatibleDish._id === selectedDish._id)
        )
        : [];



    const initialValues = {
        name: '',
        phone: '',
        ville: '',
        rue: '',
        date: '',
        time: '',
        quantite: 0
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'),
        phone: Yup.string().required('Le Téléphone est requis'),
        ville: Yup.string().required('La ville est requise'),
        rue: Yup.string().required('La rue est requise'),
        date: Yup.date().required("La date est requise"),
        time: Yup.string().required("L'heure est requise"),
        quantite: Yup.number().min(1, 'Quantité minimale de 1').required('La quantité est requise')
    });
    const openModalAddPlat = () => {
        setModalOpenAddPlat(true);
    };

    const closeModalAddPlat = () => {
        setModalOpenAddPlat(false);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Lancer la commande
            const commandeData = {
                platPrincipal: selectedDish,
                accompagnements: selectedSideDishes,
                client: {
                    nom: values.name,
                    telephone: values.phone,
                    ville: values.ville,
                    rue: values.rue,
                },
                dateLivraison: values.date,
                timeLivraison: values.time,
                quantite: values.quantite,
                prixPlat: totalPrice
            };

            const commande = await dispatch(addCommande(commandeData));

            if (commande) {
                handleRemoveDish(); // Reset selected dish
                setSelectedSideDishes([]);
                resetForm(); // Reset form values
                await successAdd();
            }
        } catch (error) {
            setIsAlertOpen(true);
        }
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
    };
    return (
        <div className="container-fluid mt-5 mb-5">
            <SectionHeader2 />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isAlertOpen}
                autoHideDuration={2000}
                onClose={() => setIsAlertOpen(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Erreur d'Ajout Palt !
                </Alert>
            </Snackbar>
            {modalOpen &&
                <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Commande ajouté avec succès" />
            }
            <div className="container-fluid mt-3">
                <div className='PlatPlanTitleContainer' style={{ justifyContent: "space-between" }}>
                    {/* <h2 className='PlatPlanTitle' >Planification Plats Personnalisé !</h2> */}
                    {/* <button className='addDishBtn' onClick={() => openModalAddPlat()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15.093" height="15.093" viewBox="0 0 15.093 15.093">
                            <path id="Tracé_64" data-name="Tracé 64" d="M16.093,10.053h-6.04v6.04H8.04v-6.04H2V8.04H8.04V2h2.014V8.04h6.04Z" transform="translate(-1.5 -1.5)" fill="#fff" stroke="#fff" strokeWidth="1" />
                        </svg>
                    </button> */}
                </div>

                <div className="row mt-4">
                    <div className="col-md-7">
                        <div className="PlanificationContainerDish">
                            <div className="PlanPlatsContainer" style={{ flex: "1" }}>
                                <div className="custom-dish">
                                    {/* <h3>Votre plat Principal</h3> */}
                                    {/* <img src={dishImage} alt="Base du plat" className="base-dish-image" /> */}
                                    {selectedDish ?
                                        <>
                                            <h5>Plat Principal :</h5>
                                            <div className="selected-dish">
                                                <div>
                                                    <img src={imagePlat} alt={selectedDish.name} />
                                                    <div className='selectedDishDesc'>
                                                        <p>{selectedDish.name}</p>
                                                        <p className='priceDish'>{selectedDish.price} €</p>
                                                    </div>

                                                </div>

                                                <button onClick={handleRemoveDish}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13.109" height="16.855" viewBox="0 0 13.109 16.855"><path id="Icon_material-delete-forever" data-name="Icon material-delete-forever" d="M8.436,19.482a1.878,1.878,0,0,0,1.873,1.873H17.8a1.878,1.878,0,0,0,1.873-1.873V8.245H8.436Zm2.3-6.667,1.32-1.32,1.994,1.985,1.985-1.985,1.32,1.32L15.375,14.8l1.985,1.985-1.32,1.32L14.055,16.12l-1.985,1.985-1.32-1.32L12.734,14.8Zm6.592-7.379L16.4,4.5H11.714l-.936.936H7.5V7.309H20.609V5.436Z" transform="translate(-7.5 -4.5)" fill="#5e8214"></path></svg>
                                                </button>
                                            </div>
                                        </>
                                        : <div className='d-flex justify-content-center align-items-center'> <EmptyAnimation text="Pas De Plats" /> </div>
                                    }

                                    <div className="selected-side-dishes">
                                        {selectedSideDishes.length > 0 &&
                                            <>
                                                <h5>Garnitures :</h5>
                                                {selectedSideDishes.map((sideDish) => (
                                                    <div key={sideDish._id} className="selected-dish">
                                                        <div>
                                                            <img src={imagePlat} alt={sideDish.name} />
                                                            <div className='selectedDishDesc'>
                                                                <p>{sideDish.name}</p>
                                                                <p className='priceDish'>{sideDish.price} €</p>
                                                            </div>
                                                        </div>
                                                        {/* <button onClick={() => handleRemoveSideDish(sideDish._id)}><svg xmlns="http://www.w3.org/2000/svg" width="17.818" height="17.818" viewBox="0 0 17.818 17.818">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13.109" height="16.855" viewBox="0 0 13.109 16.855"><path id="Icon_material-delete-forever" data-name="Icon material-delete-forever" d="M8.436,19.482a1.878,1.878,0,0,0,1.873,1.873H17.8a1.878,1.878,0,0,0,1.873-1.873V8.245H8.436Zm2.3-6.667,1.32-1.32,1.994,1.985,1.985-1.985,1.32,1.32L15.375,14.8l1.985,1.985-1.32,1.32L14.055,16.12l-1.985,1.985-1.32-1.32L12.734,14.8Zm6.592-7.379L16.4,4.5H11.714l-.936.936H7.5V7.309H20.609V5.436Z" transform="translate(-7.5 -4.5)" fill="#5e8214"></path></svg>
                                                        </svg>
                                                        </button> */}
                                                    </div>

                                                ))}</>}
                                    </div>

                                </div>
                            </div>
                            <div className='dishFormulaire'>
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ setFieldValue }) => (
                                        <Form style={{ width: "100%", height: '100%' }}>
                                            <div className="mb-3">
                                                <div className="culumnFormContainer">

                                                    <Field className="modal-input-Addguide" type="text" name="name" placeholder="Nom" />
                                                    <ErrorMessage name="name" component="span" />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="culumnFormContainer">
                                                    <Field className="modal-input-Addguide" type="text" name="phone" placeholder="Téléphone" />
                                                    <ErrorMessage name="phone" component="span" />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="culumnFormContainer">
                                                    <Field className="modal-input-Addguide" type="text" name="ville" placeholder="Ville" />
                                                    <ErrorMessage name="ville" component="span" />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="culumnFormContainer">
                                                    <Field className="modal-input-Addguide" type="text" name="rue" placeholder="Rue" />
                                                    <ErrorMessage name="rue" component="span" />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="culumnFormContainer">
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
                                                    <Field className="modal-input-Addguide" type="text" name="quantite" placeholder="Quantité" />
                                                    <ErrorMessage name="quantite" component="span" />
                                                </div>
                                            </div>

                                            <button className="confirm-btn " type="submit">Confirmer</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <h4 className='mt-2'>Prix total du plat: {totalPrice} €</h4>
                    </div>


                    <div className="col-md-5">
                        {loading ? (
                            <LoadingAnimation />
                        ) : (
                            <div className="gestionContainer">
                                {!selectedDish ? <h3>Choisissez votre plat principal</h3> : <h3>Choisissez vos Garnitures</h3>}
                                <div className="gestionContainerBody">
                                    {!selectedDish ? (
                                        dishes.map(plat => (
                                            <CardPlat key={plat._id} plat={plat} sadeDish={false} handleSelectDish={handleSelectDish} />
                                        ))
                                    ) : filteredSideDishes.length > 0 ? (
                                        filteredSideDishes.map((sideDish) => (
                                            <CardPlat key={sideDish._id} plat={sideDish} sideDish={true} handleAddSideDish={handleAddSideDish} />
                                        ))
                                    ) : (
                                        <p>Aucun accompagnement disponible pour ce plat principal.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* {modalOpenAddPlat && <AddEventPlatsModal isOpen={modalOpenAddPlat} onClose={closeModalAddPlat} />} */}
            </div>
        </div>
    )
}

export default EventPalanner