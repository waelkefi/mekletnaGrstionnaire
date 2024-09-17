import React, { useEffect, useState } from 'react';
import "./Livraison.css";
import CircuitCard from '../../Components/Cards/CircuitCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCircuitsByDate } from '../../redux/actions/CircuitAction';
import EmptyAnimation from '../../Components/animation/EmptyAnimation';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
function Itineraire() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const circuits = useSelector(state => state.circuit.circuitsByDate);
    const [selectedCircuit, setSelectedCircuit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(getCircuitsByDate());
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        circuits &&
            setSelectedCircuit(circuits[0])

    }, [circuits]);

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-5">
                    <h4 className='livraison-section-title'>Circuits</h4>
                </div>
                <div className="col-md-7">
                    <h4 className='livraison-section-title'>Map</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 itineraireCardContainer">
                    {
                        circuits.length > 0 ? circuits.map(circuit => (
                            <CircuitCard key={circuit._id}
                                circuit={circuit}
                                setSelectedCircuit={() => setSelectedCircuit(circuit)} />
                        )) : <EmptyAnimation text="Pas de circuits" />
                    }
                </div>
                <div className="col-md-7">
                    {selectedCircuit && (
                        <APIProvider apiKey={'AIzaSyAp3w6NWTgtKnNiU7igiPQxyGqbgul-HI4'}>
                            <Map center={selectedCircuit.coordinates[0]} zoom={10}>
                                <Marker position={selectedCircuit.coordinates[0]} />
                                {selectedCircuit.coordinates.length > 0 &&
                                    selectedCircuit.coordinates.map((point, index) => (
                                        <Marker
                                            key={index}
                                            position={point}
                                        />
                                    ))
                                }
                            </Map>
                        </APIProvider>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Itineraire;
