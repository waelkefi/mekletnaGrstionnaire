// utils.js

export const obtenirCoordonneesItineraire = async (adresses) => {
    const coordinates = await Promise.all(adresses.map(obtenirCoordonnees));
    return coordinates;
};

export const obtenirCoordonnees = async (adresse) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adresse)}&key=AIzaSyAp3w6NWTgtKnNiU7igiPQxyGqbgul-HI4`);
    const data = await response.json();

    // Extraire les coordonnées de la première résultat
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}