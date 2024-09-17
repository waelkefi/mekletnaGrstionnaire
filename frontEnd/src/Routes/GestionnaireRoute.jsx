import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Client from '../Pages/ClientsPage/Client';
import Commande from '../Pages/Commades/Commande';
import Livraison from '../Pages/Livraison/Livraison';
import Plats from '../Pages/Plats/Plats';
import Traiteurs from '../Pages/Traiteur/Traiteur';
import AddCircuit from '../Pages/Circuit/AddCircuit';
import Menus from '../Pages/Menu/Menu';

const GestionnaireRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={< Client />} />
            <Route exact path='/commandes' element={< Commande />} />
            <Route exact path='/itinéraires' element={< Livraison />} />
            <Route exact path='/plats' element={< Plats />} />
            <Route exact path='/menus' element={< Menus />} />
            <Route exact path='/traiteurs' element={< Traiteurs />} />
            <Route exact path='/addCircuit' element= {<AddCircuit/>} />
        </Routes>
    );
};

export default GestionnaireRoute;
