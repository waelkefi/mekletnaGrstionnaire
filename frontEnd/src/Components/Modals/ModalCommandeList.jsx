import React, { useState } from 'react';
import './Modal.css';
import CommandeCard from '../Cards/CommandeCard';

const ModalCommandeList = ({ isOpen, onClose, commandes, onCommandeSelect }) => {
    const [selectedCommandes, setSelectedCommandes] = useState([]);
    const [showCommande, setShowCommande] = useState(commandes[0]);
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleCommandeSelect = (e) => {
        const selectedCommandeId = e.target.value;
        const selectedCommande = commandes.find((cmd) => cmd._id === selectedCommandeId);

        if (e.target.checked) {
            setSelectedCommandes([...selectedCommandes, selectedCommande]);
        } else {
            setSelectedCommandes(selectedCommandes.filter((cmd) => cmd._id !== selectedCommandeId));
        }
    };

    const handleSubmit = () => {
        onCommandeSelect(selectedCommandes);
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
            <div className="modal-content-commande">
                <div className="commande-List-Modal-Container">
                    <div className="commandes-List-Conatainer">
                        <h4>Commande</h4>
                        <ul>
                            {commandes.map((e) => (
                                <li key={e._id}>
                                    <input
                                    className='form-check-input'
                                        type="checkbox"
                                        id={e._id}
                                        name="commande"
                                        value={e._id}
                                        checked={selectedCommandes.some((cmd) => cmd._id === e._id)}
                                        onChange={handleCommandeSelect}
                                    />
                                    <div className='list-commande-details' onClick={()=>setShowCommande(e)}>
                                        <label htmlFor={e._id}>
                                            {e.client.nom.toUpperCase()}
                                        </label>
                                        <p>{e.client.address.streetBuilding}, {e.client.address.state}, {e.client.address.country}
                                        </p>
                                        <div>
                                            <p> {e.date.toString().slice(0, 10)}</p>
                                            <p> {e.time}</p>
                                        </div>
                                        <p>{e.traiteur.address.streetBuilding}, {e.traiteur.address.state}, {e.traiteur.address.country}</p>
                                        <hr className='hr' />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="commandesDetails-List-Conatainer">
                        <h4>Détails De Commande</h4>
                        {
                            showCommande &&  <CommandeCard commande={showCommande}/>
                        }
                      
                        <button onClick={handleSubmit} className='confirm-btn '>Confirmer</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ModalCommandeList;
