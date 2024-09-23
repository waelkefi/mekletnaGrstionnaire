import React, { useEffect } from 'react'
import Navbar from '../../Components/LandingPage/NavBar'
import Header from '../../Components/LandingPage/Header'
import PlatsList from '../../Components/LandingPage/PlatsList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlanificationsByDate } from '../../redux/actions/PlanificationAction'
import Footer from '../../Components/LandingPage/Footer'

function LandingPage() {
    const dispatch = useDispatch()
    const plats = useSelector(state => state.planification.planifications)
    const currentDate = new Date();
    useEffect(() => {
        dispatch(fetchPlanificationsByDate(currentDate.toISOString().slice(0, 10)))
            .then((result) => {
                if (!result) {
                    console.log('Aucune planification disponible pour la date sélectionnée.');
                } 
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des planifications pour la date sélectionnée:', error);
            });
    }, [currentDate,dispatch]);
    return (
        <>
            <Navbar />
            <Header />
            <PlatsList plats={plats} />
            <Footer/>
        </>
    )
}

export default LandingPage