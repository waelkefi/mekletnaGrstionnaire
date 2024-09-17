import React, { useState, useEffect } from 'react';

const RouteOptimizationComponent = ({ data }) => {
    // État pour contenir l'itinéraire optimal
    const [itineraireOptimal, setItineraireOptimal] = useState([]);

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

    return (
        <div>
            <h3>Itinéraire Optimal :</h3>
            <ul>
                {itineraireOptimal.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
};

export default RouteOptimizationComponent;
