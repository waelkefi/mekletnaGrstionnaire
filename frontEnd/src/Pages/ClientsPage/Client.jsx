import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layouts/Layout'
import SimpleHeader from '../../Components/Headers/Header'
import LoadingAnimation from '../../Components/animation/LoadingAnimation'
import EmptyAnimation from '../../Components/animation/EmptyAnimation'
import "./Client.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllClient } from '../../redux/actions/ClientAction'
import ModalAddClient from '../../Components/Modals/ModalAddClient'
import EnvieClient from '../../Components/Client/EnvieClient'
import { getEnvies } from '../../redux/actions/EnvieClientAction'
import axios from 'axios'

import refreshToken from "../../helpers/functions";
function Client() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const clients = useSelector(state => state.client.clients)
  const envies = useSelector(state => state.envie.envies)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedClient, setSelectedClient] = useState();
  const [modalOpenAddClient, setModalOpenAddClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [plats, setPlats] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let http = await refreshToken();
        let result = await http.get('envieClient/plats/all');
        if (result) {
          console.log('res', result)
          setPlats(result.data);
        };
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching data:', error);
      }
    };
    fetchData();


  }, []);
  const selectClient = (client, index) => {
    setSelectedClient(client)
    setSelectedIndex(index)
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true)

        await dispatch(fetchAllClient())
        await dispatch(getEnvies())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    clients &&
      setSelectedClient(clients[0])

  }, [clients]);

  const openModalAddClient = () => {
    setModalOpenAddClient(true);
  };
  const closeModalAddClient = () => {
    setModalOpenAddClient(false);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Layout>
      {
        modalOpenAddClient &&
        <ModalAddClient isOpen={modalOpenAddClient} onClose={closeModalAddClient} />
      }
      <SimpleHeader title="Clients" />

      <div className="container-fluid">
        <div className="row mt-3 mb-3">
          <div className="col-md-7 client-header-container">
            <button className='addClientBtn' onClick={() => openModalAddClient()}> <svg id="Vector_Smart_Object" data-name="Vector Smart Object" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path id="Tracé_64" data-name="Tracé 64" d="M18,11.143H11.143V18H8.857V11.143H2V8.857H8.857V2h2.286V8.857H18Z" transform="translate(-2 -2)" fill="#5e8214" />
            </svg>
              Nouveau Client</button>

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
            <div className="client-table-container">
              {loading ? <LoadingAnimation />
                : clients.length > 0 ?
                  <table className="table-client">
                    <thead>
                      <tr>
                        <th>Nom &amp; Prénom</th>
                        <th>Téléphone</th>
                        <th>Adresse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.filter((client) =>
                        `${client?.phone}`.toString()
                          .includes(searchQuery.toString())
                      ).reverse().map((client, index) => (
                        <tr className={index === selectedIndex ? 'selected_tr' : ''}
                          key={index}
                          onClick={() => {
                            selectClient(client, index);
                          }}>
                          <td>{client?.name}</td>
                          <td>{client?.phone}</td>
                          <td>{client?.address?.streetBuilding}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  :
                  <EmptyAnimation text="Pas De Clients" />
              }
            </div>

          </div>
          <div className="col-md-5">
            {
              selectedClient && <div className="card-client">
                <h3>{selectedClient.name}</h3>
                <p>Tél: {selectedClient.phone} </p>
                <p>Adresse: {selectedClient.address.streetBuilding}, {selectedClient.address.state}, {selectedClient.address.country} </p>
              </div>
            }
            <EnvieClient envies={envies} plats={plats} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Client