import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import SimpleHeader from '../../Components/Headers/Header';
import EmptyAnimation from '../../Components/animation/EmptyAnimation';
import LoadingAnimation from '../../Components/animation/LoadingAnimation';
import { useDispatch, useSelector } from 'react-redux';
import CommandeCard from '../../Components/Cards/CommandeCard';
import { getCommandes } from '../../redux/actions/CommandeEventActions';

function CommandeEvent() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCommande, setSelectedCommande] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [searchQuery, setSearchQuery] = useState('');
    const commandes = useSelector(state => state.commandesEvent.commandesEvent);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(getCommandes());
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);
    useEffect(() => {
        if (commandes) {
            setSelectedCommande(commandes[0]);
        }
    }, [commandes]);


    const selectCommande = (commande, index) => {
        setSelectedCommande(commande);
        setSelectedIndex(index);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const filteredCommandes = commandes.filter((commande) =>
        commande.dateLivraison.toString().slice(0, 10) === selectedDate &&
        `${commande?.client?.name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );
    return (
     

            <div className="container-fluid containerCommande" >

                <div className="srearch-container">
                    <div className="row mt-3 mb-1">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-7 d-flex flex-row justify-content-between">
                            <input
                                className="nosubmit2"
                                type="search"
                                placeholder="Recherche..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <input
                                type="date"
                                className="nosubmit2"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="col-md-3">

                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-8">
                            <div className="client-table-container">
                                {loading ? <LoadingAnimation />
                                    :
                                    commandes.length > 0 ?
                                        <table className="table-client">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Nom</th>
                                                    <th>Téléphone</th>
                                                    <th>Date De Livraison</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCommandes.filter((commande) =>
                                                    `${commande?.client?.name}`
                                                        .toLowerCase()
                                                        .includes(searchQuery.toLowerCase())
                                                ).reverse().map((commande, index) => (
                                                    <tr className={index === selectedIndex ? 'selected_tr' : ''}
                                                        key={index}
                                                        onClick={() => {
                                                            selectCommande(commande, index);
                                                        }}
                                                    >
                                                        <td>{commande?.status == "pending" ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                                                <circle id="Ellipse_258" data-name="Ellipse 258" cx="5" cy="5" r="5" fill="#5e8214" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                                                <circle id="Ellipse_258" data-name="Ellipse 258" cx="5" cy="5" r="5" fill="#aa0102" />
                                                            </svg>
                                                        }</td>
                                                        <td>{commande?.client?.nom}</td>
                                                        <td>{commande?.client?.telephone}</td>
                                                        <td>{commande?.dateLivraison.toString().slice(0, 10)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        :
                                        <EmptyAnimation text="Pas De Commandes" />
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            {
                                selectedCommande && <div className="CommandeCard">
                                <h3>{selectedCommande?.client?.nom}</h3>
                                <p className='commandeText'>{selectedCommande?.client?.rue} {selectedCommande?.client?.ville}</p>
                    
                                <p className='commandeLabel'>Date et heure de livraison</p>
                                <div className='commandeCardDateContainer '>
                                    <p className='commandeText'>{selectedCommande?.dateLivraison.toString().slice(0, 10)}</p>
                                    <p className='commandeText' style={{marginLeft:"8px"}}>{selectedCommande?.time}</p>
                                </div>
                    
                              
                    
                                <p className='commandeLabel'> Plat Principal </p>
                                {
                                   selectedCommande.platPrincipal &&  <p className='commandeText'>- {selectedCommande.platPrincipal.name}</p>
                                }
                                <p className='commandeLabel'> Garniture </p>
                                {
                                    selectedCommande.accompagnements && selectedCommande.accompagnements.map(e => 
                                        <div className='commandeCardPlats mb-2' key={e._id}>
                                            <p className='commandeText'>- {e.name}</p>
                                        </div>
                                    )
                                }
                                <p className='commandeLabel'>Montant à payer</p>
                                <p className='commandeText'> {selectedCommande.prixPlat} dt * {selectedCommande.quantite} = <b>{selectedCommande.prixPlat * selectedCommande.quantite }  dt</b> </p>
                    
                            </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default CommandeEvent