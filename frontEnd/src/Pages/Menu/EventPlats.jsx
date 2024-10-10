import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layouts/Layout'
import SimpleHeader from '../../Components/Headers/Header'
import LoadingAnimation from '../../Components/animation/LoadingAnimation';
import AddEventPlatsModal from '../../Components/Modals/AddEventPlatsModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlatsAccompagnement } from '../../redux/actions/AccompagnementAction';
import { getAllPlatsPrincipal } from '../../redux/actions/PlatPrincipalAction';
import CardPlatEvent from './CardPlatEvent';
function EventPlats() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [modalOpenAddPlat, setModalOpenAddPlat] = useState(false);
    const dishes = useSelector(state => state.platPrincipal.platsPrincipaux)
    const sideDishes = useSelector(state => state.platAccompagnement.platsAccompagnement)
   

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


    const openModalAddPlat = () => {
        setModalOpenAddPlat(true);
    };

    const closeModalAddPlat = () => {
        setModalOpenAddPlat(false);
    };

   

    return (
      
            <div className="container-fluid mt-3">
                <div className='PlatPlanTitleContainer' style={{ justifyContent: "space-between" }}>
                    <h2 className='PlatPlanTitle' >Gestion Plats et Garnitures !</h2>
                    <button className='addDishBtn' onClick={() => openModalAddPlat()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15.093" height="15.093" viewBox="0 0 15.093 15.093">
                            <path id="Tracé_64" data-name="Tracé 64" d="M16.093,10.053h-6.04v6.04H8.04v-6.04H2V8.04H8.04V2h2.014V8.04h6.04Z" transform="translate(-1.5 -1.5)" fill="#fff" stroke="#fff" strokeWidth="1" />
                        </svg>
                    </button>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6">
                        {loading ? (
                            <LoadingAnimation />
                        ) : (
                            <div className="gestionContainer">
                                <h3>Plats principal</h3>
                                <div className="gestionContainerBody">
                                    {dishes?.length > 0 ? (
                                        dishes.map(plat => (
                                            <CardPlatEvent key={plat._id} plat={plat} sadeDish={false}  />
                                        ))
                                    ) : (
                                        <p>Pas de Plats.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="col-md-6">
                        {loading ? (
                            <LoadingAnimation />
                        ) : (
                            <div className="gestionContainer">
                                <h3>Garnitutes</h3>
                                <div className="gestionContainerBody">
                                    {sideDishes?.length > 0 ? (
                                        sideDishes.map((sideDish) => (
                                            <CardPlatEvent key={sideDish._id} plat={sideDish} sideDish={true} />
                                        ))
                                    ) : (
                                        <p>Pas de Garnitures.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {modalOpenAddPlat && <AddEventPlatsModal isOpen={modalOpenAddPlat} onClose={closeModalAddPlat} />}
            </div>
       
    );
}

export default EventPlats;
