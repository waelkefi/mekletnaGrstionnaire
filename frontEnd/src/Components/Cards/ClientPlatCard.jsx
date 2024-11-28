import React, { useState } from 'react';
import './Cards.css';
import AddCommandeClientModal from "../../Components/Modals/AddCommandeClientModal";

const API = process.env.REACT_APP_API_URL_IMAGE;

function ClientPlatCard({ plat }) {
    const [modalOpenAddCommande, setModalOpenAddCommande] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const openModalAddCommande = () => {
        setModalOpenAddCommande(true);
    };

    const closeModalAddCommande = () => {
        setModalOpenAddCommande(false);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Limite la description à 50 caractères si elle dépasse cette longueur
    const shortDescription = plat.plat.description.length > 50 
        ? `${plat.plat.description.slice(0, 70)}...` 
        : plat.plat.description;

    return (
        <div className='clientPlatCard'>
            <div className='clientPlatCardImage'>
                <img src={`${API}${plat.plat.image}`} alt="imagePlatMekletna.tn" />
            </div>
            <div className='clientPlatCardDescreption'>
                <div>
                    <h3>{plat.plat.name}</h3>
                    <p>
                        {showFullDescription ? plat.plat.description : shortDescription}
                        {plat.plat.description.length > 70 && (
                            <span onClick={toggleDescription} className="show-more">
                                {showFullDescription ? ' Afficher moins' : ' Afficher la suite'}
                            </span>
                        )}
                    </p>
                </div>

                <div className='clientPlatCardAction'>
                    <p>{plat.plat.price} Dt</p> 
                    <button onClick={() => openModalAddCommande()}>Commander</button>
                </div>
            </div>

            {modalOpenAddCommande && (
                <AddCommandeClientModal 
                    plat={plat.plat} 
                    isOpen={modalOpenAddCommande} 
                    onClose={closeModalAddCommande} 
                />
            )}
        </div>
    );
}

export default ClientPlatCard;
