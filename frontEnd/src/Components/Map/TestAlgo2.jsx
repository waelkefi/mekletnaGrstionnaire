import React, { useState, useEffect } from 'react';
import './Map.css'
const RouteOptimizationComponent = ({ data, onCoordinatesChange }) => {
    // État pour contenir l'itinéraire optimal
    const [itineraireOptimal, setItineraireOptimal] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    useEffect(() => {
        if (itineraireOptimal.length > 0) {
            obtenirCoordonneesItineraire().then((coords) => {
                setCoordinates(coords);
                // Appeler la fonction de rappel avec les coordonnées
                onCoordinatesChange(coords);
            });
        }
    }, [itineraireOptimal]);
    useEffect(() => {

        const rows = data.rows
        const origin_addresses = data.origin_addresses
        const destination_addresses = data.destination_addresses
        // Trouver le point de départ unique (adresse non répétée à la fois dans l'origine et la destination)
        const pointDepartUnique = trouverPointDepartUnique(origin_addresses, destination_addresses);

        // Générer toutes les permutations possibles des destinations
        const toutesPermutations = genererPermutations(destination_addresses);

        // Calculer la distance totale pour chaque permutation et trouver l'itinéraire optimal
        const itineraire = trouverItineraireOptimal(rows, pointDepartUnique, toutesPermutations);

        // Mettre à jour l'état de l'itinéraire optimal
        setItineraireOptimal(itineraire);
    }, [data]);

    const trouverPointDepartUnique = (adressesOrigine, adressesDestination) => {
        // Trouver l'adresse qui est unique à la fois dans l'origine et la destination
        const pointDepartUnique = adressesOrigine.find(address => !adressesDestination.includes(address));
        return pointDepartUnique;
    };

    const genererPermutations = (destinations) => {
        // Générer toutes les permutations possibles des destinations
        const toutesPermutations = [];

        const permuter = (arr, m = []) => {
            if (arr.length === 0) {
                toutesPermutations.push(m);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    const actuel = arr.slice();
                    const suivant = actuel.splice(i, 1);
                    permuter(actuel.slice(), m.concat(suivant));
                }
            }
        };

        permuter(destinations);

        return toutesPermutations;
    };

    const trouverItineraireOptimal = (rows, pointDepart, toutesPermutations) => {
        // Initialiser les variables pour suivre la distance minimale et l'itinéraire optimal
        let distanceMinimale = Infinity;
        let itineraireOptimal = [];

        // Itérer à travers toutes les permutations et calculer la distance totale pour chacune
        toutesPermutations.forEach((permutation) => {
            const distanceTotale = calculerDistanceTotale(rows, pointDepart, permutation);

            // Mettre à jour l'itinéraire optimal si la permutation actuelle a une distance plus courte
            if (distanceTotale < distanceMinimale) {
                distanceMinimale = distanceTotale;
                itineraireOptimal = [pointDepart, ...permutation];
            }
        });

        return itineraireOptimal;
    };

    const calculerDistanceTotale = (rows, pointDepart, permutation) => {
        // Calculer la distance totale pour une permutation donnée
        let distanceTotale = 0;

        // Itérer à travers chaque segment de l'itinéraire et additionner les distances
        for (let i = 0; i < permutation.length; i++) {
            const destination = permutation[i];
            distanceTotale += obtenirDistance(rows, pointDepart, destination);
            pointDepart = destination;
        }

        return distanceTotale;
    };

    const obtenirDistance = (rows, origine, destination) => {
        // Récupérer la distance entre deux adresses à partir des données d'entrée
        for (const row of rows) {
            for (const element of row.elements) {
                if (element.origin_address === origine && element.destination_address === destination) {
                    return element.distance.value;
                }
            }
        }
    };

    // Fonction pour obtenir les coordonnées (lat, lng) d'une adresse
    const obtenirCoordonnees = async (adresse) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adresse)}&key=AIzaSyAp3w6NWTgtKnNiU7igiPQxyGqbgul-HI4`);
        const data = await response.json();

        // Extraire les coordonnées de la première résultat
        const coordinates = data.results[0].geometry.location;
      
        return coordinates;
    };

    // Fonction pour obtenir les coordonnées de tous les points de l'itinéraire optimal
    const obtenirCoordonneesItineraire = async () => {
        const coordinates = await Promise.all(itineraireOptimal.map(obtenirCoordonnees));
        return coordinates;
    };

    // Mettre à jour les coordonnées lorsque l'itinéraire optimal change
    useEffect(() => {
        if (itineraireOptimal.length > 0) {
            obtenirCoordonneesItineraire();
        }
    }, [itineraireOptimal]);

    return (
        <div>
            <div className="rb-container-ficheClient">
                <ul className="rb">
                    {/* {items[0].item.activities.map((item, index) => ( */}
                    {itineraireOptimal.map((point, index) => (
                        <li className={index === selectedIndex ? "rb-item selectedAct" : "rb-item"} ng-repeat="itembx" key={index}>
                            <div className="timestamp" onClick={() => setSelectedIndex(index)} >
                                {index === 0 && "Départ : "}
                                {point}
                            </div>

                            {/* {item.transport &&
                                <div className="item-titleModal d-flex flex-row align-items-center">
                                    {item.transport.transportType === "walking" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="9.473" height="15.001" viewBox="0 0 9.473 15.001">
                                            <path id="Icon_awesome-walking" data-name="Icon awesome-walking" d="M6.157,2.812A1.414,1.414,0,0,0,7.578,1.406a1.421,1.421,0,0,0-2.841,0A1.414,1.414,0,0,0,6.157,2.812Zm2.8,4.368-.69-.346-.287-.861A3.223,3.223,0,0,0,4.953,3.75a6.561,6.561,0,0,0-2.761.738A2.812,2.812,0,0,0,.72,5.841l-.2.4A.938.938,0,0,0,2.2,7.078l.2-.4a.937.937,0,0,1,.488-.451l.793-.316L3.23,7.69a1.868,1.868,0,0,0,.441,1.723l1.773,1.916a1.885,1.885,0,0,1,.441.811l.542,2.147a.95.95,0,0,0,1.148.683.938.938,0,0,0,.69-1.137l-.657-2.607a1.868,1.868,0,0,0-.441-.811L5.82,8.958l.509-2.013.163.483A1.874,1.874,0,0,0,7.43,8.513l.69.346A.937.937,0,1,0,8.954,7.18ZM2.179,11.3a1.816,1.816,0,0,1-.42.63L.279,13.4a.932.932,0,0,0,0,1.327.952.952,0,0,0,1.338,0l1.758-1.74a1.9,1.9,0,0,0,.42-.63l.4-.99C2.558,9.6,3.05,10.142,2.792,9.793L2.179,11.3Z" transform="translate(-0.002)" fill="#ff7d1a" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14.063" height="11.251" viewBox="0 0 14.063 11.251">
                                            <path id="Icon_awesome-car-alt" data-name="Icon awesome-car-alt" d="M12.852,8.846l-.329-.823-.584-1.46A3.266,3.266,0,0,0,8.892,4.5H5.171A3.266,3.266,0,0,0,2.124,6.563l-.584,1.46-.329.823A1.871,1.871,0,0,0,0,10.594V12a1.86,1.86,0,0,0,.469,1.229v1.584a.938.938,0,0,0,.938.938h.938a.938.938,0,0,0,.938-.938v-.938h7.5v.938a.938.938,0,0,0,.938.938h.938a.938.938,0,0,0,.938-.938V13.229A1.859,1.859,0,0,0,14.063,12V10.594A1.871,1.871,0,0,0,12.852,8.846ZM3.865,7.259a1.406,1.406,0,0,1,1.306-.884H8.892a1.406,1.406,0,0,1,1.306.884l.584,1.46h-7.5l.584-1.46ZM2.344,11.995a.935.935,0,1,1,0-1.869,1.8,1.8,0,0,1,1.406,1.4C3.75,12.088,2.906,11.995,2.344,11.995Zm9.376,0c-.563,0-1.406.093-1.406-.467a1.8,1.8,0,0,1,1.406-1.4.935.935,0,1,1,0,1.869Z" transform="translate(0 -4.5)" fill="#ff7d1a" />
                                        </svg>
                                    }

                                    <p>  {renderTime(item)} I {item.transport.distanceText}</p>
                                </div>

                            } */}
                        </li>
                    ))}

                </ul>
            </div>
            <ul>
                {/* {itineraireOptimal.map((point, index) => (
                    <li key={index}>{point}</li>
                ))} */}
            </ul>
        </div>
    );
};

export default RouteOptimizationComponent;
