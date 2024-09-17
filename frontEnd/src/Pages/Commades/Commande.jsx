import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import SimpleHeader from '../../Components/Headers/Header';
import EmptyAnimation from '../../Components/animation/EmptyAnimation';
import LoadingAnimation from '../../Components/animation/LoadingAnimation';
import { useDispatch, useSelector } from 'react-redux';
import "./Commande.css";
import CommandeCard from '../../Components/Cards/CommandeCard';
import AddCommandeModal from '../../Components/Modals/AddCommandeModal';
import { getCommandes } from '../../redux/actions/CommandeAction';

function Commande() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [modalOpenAddCommande, setModalOpenAddCommande] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCommande, setSelectedCommande] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Date d'aujourd'hui par défaut
    const [searchQuery, setSearchQuery] = useState('');
    const commandes = useSelector(state => state.commande.commandes);

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

    const openModalAddCommande = () => {
        setModalOpenAddCommande(true);
    };

    const closeModalAddCommande = () => {
        setModalOpenAddCommande(false);
    };

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
        commande.date.toString().slice(0, 10) === selectedDate &&
        `${commande?.client?.firstName} ${commande?.client?.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );
    return (
        <Layout>
            {
                modalOpenAddCommande && <AddCommandeModal isOpen={modalOpenAddCommande} onClose={closeModalAddCommande} />
            }
            <SimpleHeader title="Commandes" />

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
                        <div className="col-md-2 btnsCommandeContainer">
                            <button className='addCommandeBtn' onClick={() => openModalAddCommande()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="47.929" height="47.929" viewBox="0 0 47.929 47.929">
                                    <g id="Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline" transform="translate(-3.375 -3.375)">
                                        <path id="Tracé_2819" data-name="Tracé 2819" d="M33.209,20.939H24.625V12.355a1.843,1.843,0,0,0-3.687,0v8.583H12.355a1.766,1.766,0,0,0-1.843,1.843,1.784,1.784,0,0,0,1.843,1.843h8.583v8.583a1.786,1.786,0,0,0,1.843,1.843,1.834,1.834,0,0,0,1.843-1.843V24.625h8.583a1.843,1.843,0,1,0,0-3.687Z" transform="translate(4.558 4.558)" fill="#fff" />
                                        <path id="Tracé_2820" data-name="Tracé 2820" d="M27.34,6.6A20.742,20.742,0,0,1,42.006,42.006,20.742,20.742,0,0,1,12.673,12.673,20.6,20.6,0,0,1,27.34,6.6m0-3.226A23.965,23.965,0,1,0,51.3,27.34,23.961,23.961,0,0,0,27.34,3.375Z" fill="#fff" />
                                    </g>
                                </svg>

                            </button>
                            <button className='pendingCommandeBtn'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40.357" height="45" viewBox="0 0 40.357 45">
                                    <path id="Tracé_2717" data-name="Tracé 2717" d="M-1180.593-23.215a1,1,0,0,0-.646-.214q-1.552-.021-4.513-.142a.1.1,0,0,1-.093-.1,55.85,55.85,0,0,0-.064-5.616,17.165,17.165,0,0,0-1.7-6.154,17.533,17.533,0,0,0-7.648-8.117c-.111-.058-.111-.118,0-.18a18.186,18.186,0,0,0,8.817-11.313,13.582,13.582,0,0,0,.514-3.391q.029-1.939.029-1.953.131-2.273.088-2.76-.055-.623.437-.6c.184.008.282.011.293.01q1.576-.067,3.152,0a2.049,2.049,0,0,0,1.3-.345.907.907,0,0,0,.288-1.244,1.04,1.04,0,0,0-.809-.685,21.618,21.618,0,0,0-3.494-.1,11.437,11.437,0,0,1-1.553-.008l-29.84.016q-1.82.055-3.639.132a.834.834,0,0,0-.623.3q-.542,1.261.334,1.671a3.761,3.761,0,0,0,1.376.171q1.7.009,3.39.128a.126.126,0,0,1,.113.1,6.979,6.979,0,0,1,.068,1.273,39.355,39.355,0,0,0,.1,3.938,18.161,18.161,0,0,0,.656,3.815,18.7,18.7,0,0,0,5.277,8.433,15.053,15.053,0,0,0,3.505,2.412c.064.033.064.066,0,.1a18.4,18.4,0,0,0-8.825,11.024,15.492,15.492,0,0,0-.557,3.311q-.194,2.806-.126,5.62a.1.1,0,0,1-.095.1q-2.032.018-4.064.06a1.762,1.762,0,0,0-.986.241,1.114,1.114,0,0,0-.441,1.044.9.9,0,0,0,.167.479,1.369,1.369,0,0,0,.382.359,1.439,1.439,0,0,0,.72.167q3.03.073,6.065.066,14.975-.026,29.95-.027.049,0,.965.041a6.1,6.1,0,0,0,.962-.035,1.051,1.051,0,0,0,.75-.378,1.432,1.432,0,0,0,.285-1.1A.828.828,0,0,0-1180.593-23.215ZM-1208.07-38.9a11.989,11.989,0,0,1,3.445-2.508q.748-.364,1.081-.561a1.747,1.747,0,0,0,.885-1.923,1.99,1.99,0,0,0-1.178-1.6c-.2-.091-.3-.14-.309-.144a15.063,15.063,0,0,1-7.146-7.626,15.237,15.237,0,0,1-1.411-6.1q-.02-.935-.031-2.053a17.441,17.441,0,0,1,.1-2.055.3.3,0,0,1,.3-.268q11.29,0,22.546-.029a11.752,11.752,0,0,1,1.434.078.231.231,0,0,1,.21.229l-.043,3.854a13.777,13.777,0,0,1-.546,4.347,17.321,17.321,0,0,1-2.62,5.143A13.691,13.691,0,0,1-1196.4-45.8c-.119.056-.328.169-.633.336a3.18,3.18,0,0,0-.594.4,1.743,1.743,0,0,0-.448,2.081,2.294,2.294,0,0,0,1.232,1.275c.5.235.755.355.765.361a15.122,15.122,0,0,1,6.393,6.964q.124.238.235.481a11.15,11.15,0,0,1-5.49.218c-2.542-.684-12.868-.615-16.588.08a17.532,17.532,0,0,1,1.128-2.2A17.544,17.544,0,0,1-1208.07-38.9Z" transform="translate(1220.574 66.139)" fill="#fff" />
                                </svg>

                            </button>
                            <button className='livredCommandeBtn'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="51.828" height="49" viewBox="0 0 51.828 49">
                                    <g id="Groupe_6913" data-name="Groupe 6913" transform="translate(-2.5 -2.5)">
                                        <path id="Tracé_2815" data-name="Tracé 2815" d="M13.5,24.2,21.3,32l26-26" transform="translate(4.193 1.1)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                        <path id="Tracé_2816" data-name="Tracé 2816" d="M48.9,27V44.5a4.967,4.967,0,0,1-4.933,5H9.433a4.967,4.967,0,0,1-4.933-5V9.5a4.967,4.967,0,0,1,4.933-5H36.566" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                    </g>
                                </svg>

                            </button>
                        </div>
                        <div className="col-md-7">
                        <div className="client-table-container">
                            {loading ? <LoadingAnimation />
                                :
                                commandes.length > 0 ?
                                    <table className="table-client">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Nom &amp; Prénom</th>
                                                <th>Téléphone</th>
                                                <th>Date De Livraison</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCommandes.filter((commande) =>
                                                `${commande?.client?.firstName} ${commande?.client?.lastName}`
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
                                                    <td>{commande?.client?.firstName} {commande?.client?.lastName}</td>
                                                    <td>{commande?.client?.phone}</td>
                                                    <td>{commande?.date.toString().slice(0, 10)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :
                                    <EmptyAnimation text="Pas De Commandes" />
                            }
                            </div>
                        </div>
                        <div className="col-md-3">
                            {
                                selectedCommande && <CommandeCard commande={selectedCommande} />
                            }
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Commande