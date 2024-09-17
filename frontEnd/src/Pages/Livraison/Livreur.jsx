import React, { useEffect, useState } from 'react'
import "./Livraison.css"
import LivreurCard from '../../Components/Cards/LivreurCard'
import CardLivreurDetails from '../../Components/Cards/CardLivreurDetails'
import AddLivreurModal from '../../Components/Modals/AddLivreurModal'
import { fetchAllLivreur } from '../../redux/actions/LivreurAction'
import { useDispatch, useSelector } from 'react-redux'
import LoadingAnimation from '../../Components/animation/LoadingAnimation'
import EmptyAnimation from '../../Components/animation/EmptyAnimation'
import { getCircuitsByLivreur } from '../../redux/actions/CircuitAction'
function Livreur() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const livreurs = useSelector(state => state.livreur.livreurs)
    const circuits = useSelector(state => state.circuit.circuitsByLivreur)
    const [modalOpenAddLivreur, setModalOpenAddLivreur] = useState(false)
    const openModalAddLivreur = () => {
        setModalOpenAddLivreur(true);
    };
    const closeModalAddLivreur = () => {
        setModalOpenAddLivreur(false);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)

                await dispatch(fetchAllLivreur())
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {

        const fetchData = async () => {
            try {
                livreurs &&
                await dispatch(getCircuitsByLivreur(livreurs[0]._id))
              
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [livreurs]);

    console.log('circuits',circuits)

    return (
        <div className="container-fluid">
            {
                modalOpenAddLivreur &&
                <AddLivreurModal isOpen={modalOpenAddLivreur} onClose={closeModalAddLivreur} />
            }
            <div className="row mt-3">
                <div className="col-md-8 d-flex justify-content-between align-items-center">
                    <h4 className='livraison-section-title'>Livreurs</h4>
                    <button className='addLivreurBtn' onClick={() => openModalAddLivreur()}><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                        <path id="Tracé_64" data-name="Tracé 64" d="M11,7.143H7.143V11H5.857V7.143H2V5.857H5.857V2H7.143V5.857H11Z" transform="translate(-1.5 -1.5)" fill="#fff" stroke="#fff" strokeWidth="1" />
                    </svg>
                        <span>Nouveau Livreur</span> </button>
                </div>
                <div className="col-md-4">

                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    {loading ? <LoadingAnimation />
                        : livreurs.length > 0 ?
                            <div className="LivreurCardContainer">
                                {
                                    livreurs.map((livreur, index) => (
                                        <LivreurCard key={index} livreur={livreur} />))
                                }

                            </div>
                            : <EmptyAnimation text="Pas De Livreurs" />}
                </div>
                <div className="col-md-4">
                    <CardLivreurDetails circuits={circuits} />
                </div>
            </div>
        </div>

    )
}

export default Livreur