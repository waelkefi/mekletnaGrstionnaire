import React, { useEffect, useState } from 'react';
// import "./Plats.css";
import PlasCard from '../Cards/PlasCard';
import Select from 'react-select';
import AddPlatModal from '../Modals/AddPlatModal';
import { getAllPlats } from '../../redux/actions/PlatAction';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../animation/LoadingAnimation';
import { fetchAllTraiteur } from '../../redux/actions/TraiteurAction';
import { createPlanification } from '../../redux/actions/PlanificationAction';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AddMenuModal from '../Modals/AddMenuModal';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function GestionMenu({ selectedDate, PlanPlats }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [modalOpenAddMenu, setModalOpenAddMenu] = useState(false);
    const plats = useSelector(state => state.plat.plats);
    const traiteurs = useSelector(state => state.traiteur.traiteurs);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(getAllPlats());
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(fetchAllTraiteur());
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

    const allOption = { _id: 'tous', firstName: 'Tous', lastName: '' };
    const allOptions = [allOption, ...traiteurs];

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };

    const customStyles = {
        control: (styles, { isFocused, isSelected }) => ({
            ...styles,
            width: '300px',
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

    const openModalAddMenu = () => {
        setModalOpenAddMenu(true);
    };

    const closeModalAddMenu = () => {
        setModalOpenAddMenu(false);
    };

    const filteredPlats = plats.filter(plat =>
        selectedOption && selectedOption._id !== 'tous' ? plat.traiteur._id === selectedOption._id : true
    );
    const addMenuToPlan = (platId) => {
        if (selectedDate && platId) {
            const existingPlan = PlanPlats.find(plan => plan.plat._id === platId);

            if (!existingPlan) {
                const data = {
                    date: selectedDate.toISOString().slice(0, 10),
                    plat: platId,
                };
                dispatch(createPlanification(data))
                    .then((result) => {
                        if (result) {
                            console.log('Plat ajouté à la planification avec succès!');
                        } else {
                            console.log('Erreur lors de l\'ajout du plat à la planification.');
                        }
                    })
                    .catch((error) => {
                        console.error('Erreur lors de l\'ajout du plat à la planification:', error);
                    });
            } else {
                setIsAlertOpen(true);
            }
        } else {
            console.error('Veuillez sélectionner une date et un plat valide.');
        }
    };
    return (
        <>
            {loading ? (
                <LoadingAnimation />
            ) : (
                <div className="gestionContainer">
                    {modalOpenAddMenu && <AddMenuModal isOpen={modalOpenAddMenu} onClose={closeModalAddMenu} />}
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                        open={isAlertOpen}
                        autoHideDuration={2000}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Le Menu est déjà planifié pour cette date!
                        </Alert>
                    </Snackbar>
                    <div className="gestionContainerHeader">
                        <div>
                            <h3>Menus</h3>
                            <button onClick={() => openModalAddMenu()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.093" height="15.093" viewBox="0 0 15.093 15.093">
                                    <path id="Tracé_64" data-name="Tracé 64" d="M16.093,10.053h-6.04v6.04H8.04v-6.04H2V8.04H8.04V2h2.014V8.04h6.04Z" transform="translate(-1.5 -1.5)" fill="#fff" stroke="#fff" strokeWidth="1" />
                                </svg>
                            </button>
                        </div>
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            options={allOptions}
                            isSearchable
                            onInputChange={(inputValue) => setSearchInput(inputValue)}
                            placeholder="Sélectionnez un Traiteur"
                            className='gestionContainerHeaderSelect'
                            styles={customStyles}
                            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                            getOptionValue={(option) => option._id}
                        />
                    </div>
                    <div className="gestionContainerBody">
                        {filteredPlats.map(plat => (
                            <div key={plat._id}>
                                <button onClick={() => addMenuToPlan(plat._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.818" height="17.818" viewBox="0 0 17.818 17.818">
                                        <path id="Icon_material-add-to-photos" data-name="Icon material-add-to-photos" d="M4.782,6.564H3V19.036a1.787,1.787,0,0,0,1.782,1.782H17.254V19.036H4.782ZM19.036,3H8.345A1.787,1.787,0,0,0,6.564,4.782V15.472a1.787,1.787,0,0,0,1.782,1.782H19.036a1.787,1.787,0,0,0,1.782-1.782V4.782A1.787,1.787,0,0,0,19.036,3Zm-.891,8.018H14.582v3.564H12.8V11.018H9.236V9.236H12.8V5.673h1.782V9.236h3.564Z" transform="translate(-3 -3)" fill="#5e8214" />
                                    </svg>

                                </button>
                                <PlasCard {...plat} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default GestionMenu;
