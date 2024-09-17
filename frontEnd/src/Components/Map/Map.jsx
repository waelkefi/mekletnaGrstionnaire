import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import RouteOptimizationComponent from './TestAlgo2';




function Mapss() {
    const [distanceData, setDistanceData] = useState(null);
    const [itineraireOptimal, setItineraireOptimal] = useState([]); // Ajout de l'état pour itineraireOptimal
    const position = { lat: 53.54992, lng: 10.00678 }; // Ajout de la position initiale
    const [coordinates, setCoordinates] = useState([]);
    function tsp(data) {
        const originAddresses = data.origin_addresses;
        const destinationAddresses = data.destination_addresses;
        const cities = [...originAddresses, ...destinationAddresses];

        // Créer une matrice de distances entre les points
        const distancesMatrix = data.rows.map(row =>
            row.elements.map(element => element.distance.value)
        );

        function calculateTotalDistance(route) {
            let totalDistance = 0;
            for (let i = 0; i < route.length - 1; i++) {
                const start = route[i];
                const end = route[i + 1];

                // Vérifier si les indices sont valides
                if (distancesMatrix[start] && distancesMatrix[start][end]) {
                    totalDistance += distancesMatrix[start][end];
                }
                // } else {
                //     console.error('Indices de distance invalides :', start, end);
                // }
            }
            return totalDistance;
        }

        function generateOptimizedRoute() {
            const numCities = cities.length;
            const initialRoute = Array.from({ length: numCities }, (_, index) => index);

            let bestRoute = [...initialRoute];
            let bestDistance = calculateTotalDistance(bestRoute);

            const iterations = 1000;
            for (let i = 0; i < iterations; i++) {
                const randomRoute = [...initialRoute].sort(() => Math.random() - 0.5);
                const randomDistance = calculateTotalDistance(randomRoute);

                if (randomDistance < bestDistance) {
                    bestRoute = [...randomRoute];
                    bestDistance = randomDistance;
                }
            }

            return bestRoute;
        }

        const optimizedRoute = generateOptimizedRoute();
        const optimizedItinerary = optimizedRoute.map(index => cities[index]);

        return optimizedItinerary;
    }
    useEffect(() => {
        const origins = [
            'Immeuble Montazah, Rue Snounou - Mourouj 5 Rue Snounou, El Mourouj 2074, Tunisia',
            'El Mourouj 2, Tunis, Tunisia',
            'Lafayette, Tunis, Tunisia',
            'Rue de france, Ben Arous, Tunisia',
            'Kabbaria, Tunis, Tunisia',
            'Ibn sina, Tunis, Tunisia',
        ];

        const destinations = [
            'El Mourouj 2, Tunis, Tunisia',
            'Kabbaria, Tunis, Tunisia',
            'Lafayette, Tunis, Tunisia',
            'Ibn sina, Tunis, Tunisia',
            'Rue de france, Ben Arous, Tunisia',
        ];

        const fetchData = async () => {
            try {
                const originQueries = origins.map(origin => `origin=${origin}`).join('&');
                const destinationQueries = destinations.map(destination => `destinations=${destination}`).join('&');
                const response = await fetch(`http://localhost:5002/get-distances?${originQueries}&${destinationQueries}`);
                const data = await response.json();

                data.rows.forEach((row, rowIndex) => {
                    row.elements.forEach((element, elementIndex) => {
                        element.origin_address = data.origin_addresses[rowIndex];
                        element.destination_address = data.destination_addresses[elementIndex];
                    });
                });

                const optimizedItinerary = tsp(data);
                setItineraireOptimal(optimizedItinerary); // Mettre à jour l'état de itineraireOptimal
                setDistanceData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des distances:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div style={{ height: '100vh', width: '100%' }}>
                <APIProvider apiKey={'AIzaSyAp3w6NWTgtKnNiU7igiPQxyGqbgul-HI4'}>
                <Map center={coordinates[0]} zoom={10}>
                        <Marker position={coordinates[0]} />
                        {coordinates.length > 0 &&
                            coordinates.map((point, index) => (
                                <Marker
                                    key={index}
                                    position={point}
                                />
                            ))
                        }
                    </Map>
                </APIProvider>
                {
                    distanceData && <RouteOptimizationComponent data={distanceData} onCoordinatesChange={(coords) => setCoordinates(coords)} />
                }
            </div>
        </>
    );
}

export default Mapss;