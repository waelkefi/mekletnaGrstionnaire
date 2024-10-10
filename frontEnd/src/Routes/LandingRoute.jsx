import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage/LandingPage';
import EventClientPage from '../Pages/LandingPage/EventClientPage';
import Login from '../Components/Authentification/Login';

const LandingRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={< LandingPage />} />
            <Route exact path='/Event' element={< EventClientPage/>} />
            <Route path="/login" element={< Login />} />

        </Routes>
    );
};

export default LandingRoutes;
