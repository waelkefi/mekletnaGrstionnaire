import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../../Components/Layouts/Layout';
import "./Circuit.css";
import SimpleHeaderWithBack from '../../Components/Headers/HeaderWithBack';
import CiruitHeader from '../../Components/Headers/CiruitHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTraiteur } from '../../redux/actions/TraiteurAction';
import { getCommandeByTraiteurAndDate } from '../../redux/actions/CommandeAction';
import Select from 'react-select';
import ModalCommandeList from '../../Components/Modals/ModalCommandeList';
import RouteOptimizationComponent from '../../Components/Map/TestAlgo2';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { fetchAllLivreur } from '../../redux/actions/LivreurAction';
import { addCircuit } from '../../redux/actions/CircuitAction';
import ModalAnimation from '../../Components/Modals/ModalAnimation';
import { useNavigate } from 'react-router-dom';
function AddCircuit() {

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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedTraiteur, setSelectedTraiteur] = useState(null);
    const [searchTraiteurInput, setSearchTraiteurInput] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [commandeList, setCommandeList] = useState([]);
    const traiteurs = useSelector((state) => state.traiteur.traiteurs);
    const commandes = useSelector((state) => state.commande.commandesByTraiteur);
    const [showCommandeModal, setShowCommandeModal] = useState(false);

    const [distanceData, setDistanceData] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    const [selectedLivreur, setSelectedLivreur] = useState(null);
    const [searchLivreurInput, setSearchLivreurInput] = useState('');
    const livreurs = useSelector(state => state.livreur.livreurs);


    const filteredLivreurs = livreurs.filter(livreur =>
        `${livreur?.firstName} ${livreur?.lastName}`
            .toLowerCase()
            .includes(searchLivreurInput.toLowerCase())
    );

    const handleLivreurChange = (selectedOption) => {
        setSelectedLivreur(selectedOption);
    };

    const filteredTraiteurs = traiteurs.filter((traiteur) =>
        `${traiteur?.firstName} ${traiteur?.lastName}`
            .toLowerCase()
            .includes(searchTraiteurInput.toLowerCase())
    );

    const handleTraiteurChange = (selectedTraiteur, setFieldValue) => {
        setSelectedTraiteur(selectedTraiteur);
        setFieldValue("traiteur", selectedTraiteur);
        dispatch(getCommandeByTraiteurAndDate(selectedTraiteur._id));
    };

    const openModalListCommande = () => {
        setShowCommandeModal(true);
    };

    const closeModalListCommande = () => {
        setShowCommandeModal(false);
    };

    const handleCommandeSelect = (selectedCommandes) => {
        setCommandeList(selectedCommandes);
        setShowCommandeModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(fetchAllTraiteur());
                await dispatch(fetchAllLivreur())
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);



    const initialValues = {
        traiteur: null,
        commandes: commandeList,
    };

    const validationSchema = Yup.object().shape({
        traiteur: Yup.string().required("Le traiteur est requis"),
        commandes: Yup.array().min(1, "Sélectionnez au moins une commande"),
    });

    const handleSave = async () => {
        const circuit = {
            commande: commandeList,
            livreur: selectedLivreur,
            date: new Date().toISOString().split('T')[0],
            coordinates: coordinates
        }
        try {
            await dispatch(addCircuit(circuit)).then(result => {
                if (result) {
                  successAdd();
                }
              })
            
        }
        catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
            setIsAlertOpen(true);
        }
    }
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
      navigate('/itinéraires')
    };
    const handleSubmit = async (values) => {
        try {
            // Logique de soumission ici

            // Extraction des adresses des clients
            const destinations = commandeList.map((commande) => {
                return `${commande.client.address.streetBuilding}, ${commande.client.address.state}, ${commande.client.address.country}`;
            });

            // Ajouter l'adresse de newAddress à la table origin
            const origins = [...destinations, `${values.traiteur.address.streetBuilding}, ${values.traiteur.address.state}, ${values.traiteur.address.country}`];

            try {
                const originQueries = origins.map(origin => `origin=${origin}`).join('&');
                const destinationQueries = destinations.map(destination => `destinations=${destination}`).join('&');
                const response = await fetch(`http://localhost:5002/get-distances?${originQueries}&${destinationQueries}`);
                const data = await response.json();

                data.rows.forEach((row, rowIndex) => {
                    row.elements.forEach((element, elementIndex) => {
                        element.origin_address = data.origin_addresses[rowIndex];
                        element.destination_address = data.destination_addresses[elementIndex];
                    });
                });

                setDistanceData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des distances:', error);
            }


        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
            setIsAlertOpen(true);
        }
    };

    return (
        <Layout>
            <SimpleHeaderWithBack title="Itinéraires Et Livraisons" />
            {modalOpen &&
                <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Circuit ajouté avec succès" />
            }
            <div className="container-fluid">
                <CiruitHeader />
                <div className="row">
                    <div className="col-md-3">
                        <div className="addCircuitContainer">
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                {({ setFieldValue }) => (
                                    <Form style={{ width: '100%', height: '100%' }}>
                                        <div className="mb-3">
                                            <div className="culumnFormContainer">
                                                <label className="modal-label-Addguide" htmlFor="traiteur">Laboratoire/traiteur</label>
                                                <Select
                                                    name="traiteur"
                                                    value={selectedTraiteur}
                                                    onChange={(selectedOption) => handleTraiteurChange(selectedOption, setFieldValue)}
                                                    options={filteredTraiteurs}
                                                    isSearchable
                                                    onInputChange={(inputValue) => setSearchTraiteurInput(inputValue)}
                                                    placeholder="Sélectionnez un Traiteur"
                                                    className='gestionContainerHeaderSelect'
                                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                                    getOptionValue={(option) => option}
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="traiteur" component="span" />
                                            </div>
                                        </div>
                                        <div className="mb-3">

                                            <label className="modal-label-Addguide mb-3" htmlFor="Commandes">Commandes</label>

                                            {commandeList.length > 0 && (
                                                <div>
                                                    <label>Commandes sélectionnées :</label>
                                                    <ul>
                                                        {commandeList.map(commande => (
                                                            <li key={commande._id}>
                                                                {commande.client.firstName} {commande.client.lastName}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={openModalListCommande}
                                                className="add-btn-plats-section"
                                            >
                                                <span>+ Commande</span>
                                            </button>
                                        </div>
                                        <button className='confirm-btn ' type='submit'>Générer Un Circuit</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {
                            distanceData && <RouteOptimizationComponent data={distanceData} onCoordinatesChange={(coords) => setCoordinates(coords)} />
                        }
                    </div>
                    <div className="col-md-6">
                       
                        {
                            coordinates && <APIProvider apiKey={'AIzaSyAp3w6NWTgtKnNiU7igiPQxyGqbgul-HI4'}>
                                <Map center={coordinates[0]} zoom={10}>
                                    <Marker position={coordinates[0]} />
                                    {coordinates.length > 0 &&
                                        coordinates.map((point, index) => (
                                            <Marker
                                                key={index}
                                                position={point}
                                            />
                                        ))
                                    }
                                </Map>
                            </APIProvider>
                        }
                        <div className='add-circ-btn-container'>

                            <label className="modal-label-Addguide" htmlFor="traiteur">Livreurs</label>

                            <div className='add-circ-form-liv'>
                                <Select
                                    name="livreur"
                                    value={selectedLivreur}
                                    onChange={(selectedOption) => handleLivreurChange(selectedOption)}
                                    options={filteredLivreurs}
                                    isSearchable
                                    onInputChange={(inputValue) => setSearchLivreurInput(inputValue)}
                                    placeholder="Sélectionnez un Livreur"
                                    className='gestionContainerHeaderSelect'
                                    styles={customStyles}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                    getOptionValue={(option) => option._id}
                                />

                                <button className='confirm-btn' onClick={handleSave}>Partager le circuit</button>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
            {showCommandeModal && (
                <ModalCommandeList
                    isOpen={showCommandeModal}
                    onClose={closeModalListCommande}
                    commandes={commandes}
                    onCommandeSelect={handleCommandeSelect}
                />
            )}
        </Layout>
    );
}

export default AddCircuit;
