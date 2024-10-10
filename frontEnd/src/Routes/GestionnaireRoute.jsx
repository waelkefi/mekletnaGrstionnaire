import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Client from '../Pages/ClientsPage/Client';
import Commande from '../Pages/Commades/Commande';
import Livraison from '../Pages/Livraison/Livraison';
import Plats from '../Pages/Plats/Plats';
import Traiteurs from '../Pages/Traiteur/Traiteur';
import AddCircuit from '../Pages/Circuit/AddCircuit';
import PlatPersonnalisé from '../Pages/Menu/PlatPersonnalisé';
import EventPlats from '../Pages/Menu/EventPlats';
import CommandeEvent from '../Pages/Menu/CommandeEvent';

const GestionnaireRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={< Client />} />
            <Route exact path='/commandes' element={< Commande />} />
            <Route exact path='/itinéraires' element={< Livraison />} />
            <Route exact path='/plats' element={< Plats />} />
           
            <Route exact path='/traiteurs' element={< Traiteurs />} />
            <Route exact path='/addCircuit' element= {<AddCircuit/>} />

            <Route exact path='/menus' element={< PlatPersonnalisé />} />
            <Route exact path='/eventPalts' element={<EventPlats/>} />
            <Route exact path='/commandeEvent' element={<CommandeEvent/>} />
        </Routes>
    );
};

export default GestionnaireRoute;
