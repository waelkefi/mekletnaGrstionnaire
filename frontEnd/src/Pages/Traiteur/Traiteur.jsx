import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layouts/Layout'
import SimpleHeader from '../../Components/Headers/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTraiteur } from '../../redux/actions/TraiteurAction'
import LoadingAnimation from '../../Components/animation/LoadingAnimation'
import EmptyAnimation from '../../Components/animation/EmptyAnimation'
import ModalAddTraiteur from '../../Components/Modals/ModalAddTraiteur'
function Traiteurs() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const traiteurs = useSelector(state => state.traiteur.traiteurs)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTraiteur, setSelectedTraiteur] = useState();
    const [modalOpenAddTraiteur, setModalOpenAddTraiteur] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const selectTraiteur = (traiteur, index) => {
        setSelectedTraiteur(traiteur)
        setSelectedIndex(index)
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)

                await dispatch(fetchAllTraiteur())

                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        traiteurs &&
            setSelectedTraiteur(traiteurs[0])

    }, [traiteurs]);

    const openModalAddTraiteur = () => {
        setModalOpenAddTraiteur(true);
    };
    const closeModalAddTraiteur = () => {
        setModalOpenAddTraiteur(false);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <Layout>
            <SimpleHeader title="Traiteurs" />
            {
        modalOpenAddTraiteur &&
        <ModalAddTraiteur isOpen={modalOpenAddTraiteur} onClose={closeModalAddTraiteur} />
      }
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-7 client-header-container">
                        <button className='addClientBtn' onClick={() => openModalAddTraiteur()}> <svg id="Vector_Smart_Object" data-name="Vector Smart Object" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path id="Tracé_64" data-name="Tracé 64" d="M18,11.143H11.143V18H8.857V11.143H2V8.857H8.857V2h2.286V8.857H18Z" transform="translate(-2 -2)" fill="#5e8214" />
                        </svg>
                            Nouveau Traiteur</button>

                        <input
                            className="nosubmit2"
                            type="search"
                            placeholder="Recherche..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        {loading ? <LoadingAnimation />
                            : traiteurs.length > 0 ?
                                <table className="table-client">
                                    <thead>
                                        <tr>
                                            <th>Nom &amp; Prénom</th>
                                            <th>Téléphone</th>
                                            <th>Adresse</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {traiteurs.filter((traiteur) =>
                                            `${traiteur?.firstName} ${traiteur?.lastName}`
                                                .toLowerCase()
                                                .includes(searchQuery.toLowerCase())
                                        ).map((traiteur, index) => (
                                            <tr className={index === selectedIndex ? 'selected_tr' : ''}
                                                key={index}
                                                onClick={() => {
                                                    selectTraiteur(traiteur, index);
                                                }}>
                                                <td>{traiteur?.firstName} {traiteur?.lastName}</td>
                                                <td>{traiteur?.phone}</td>
                                                <td>{traiteur?.address?.streetBuilding}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                :
                                <EmptyAnimation text="Pas De Traiteurs" />
                        }
                    </div>
                    <div className="col-md-5">
                        {
                            selectedTraiteur && <div className="card-client">
                                <h3>{selectedTraiteur.firstName} {selectedTraiteur.lastName}</h3>
                                <p>Tél: {selectedTraiteur.phone} </p>
                                <p>Adresse: {selectedTraiteur.address.streetBuilding}, {selectedTraiteur.address.state}, {selectedTraiteur.address.country} </p>
                            </div>
                        }
                       
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Traiteurs