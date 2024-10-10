import React from 'react'
import Navbar from '../../Components/LandingPage/NavBar'
import Header from '../../Components/LandingPage/Header'
import SectionHeader2 from '../../Components/LandingPage/SectionHeader2'
import OrderWizard from '../../Components/LandingPage/OrderWizard/OrderWizard'
import Footer from '../../Components/LandingPage/Footer'

function EventClientPage() {
    return (
        <>
            <Navbar />
            <Header />
            <SectionHeader2 />
            <OrderWizard />
            <Footer />

        </>
    )
}

export default EventClientPage