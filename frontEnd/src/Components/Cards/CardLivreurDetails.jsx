import React from 'react'
import './Cards.css'
function CardLivreurDetails({circuits}) {
    console.log('circuits', circuits)

    // Fonction pour vérifier si toutes les commandes d'un circuit sont livrées
function toutesLesCommandesLivre(circuit) {
    return circuit.commande.every(commande => commande.delivery_status === "DELIVERED");
  }
  
const commLiv = circuits.map(e => (e.commande.filter(commande => commande.delivery_status === "DELIVERED")))
console.log("commLiv",commLiv)
  // Filtrer les circuits qui ont toutes les commandes livrées
  const circuitsAvecCommandesLivre = circuits.filter(circuit => toutesLesCommandesLivre(circuit));
  
  // Afficher les circuits avec toutes les commandes livrées
  console.log("Circuits avec toutes les commandes livrées :");
  circuitsAvecCommandesLivre.forEach(circuit => {
    console.log(`- Circuit ID: ${circuit._id}`);
    console.log("  Commandes livrées :");
    circuit.commande.forEach(commande => {
      if (commande.delivery_status === "DELIVERED") {
        console.log(`    - Commande ID: ${commande._id}`);
      }
    });
    console.log("  Parcours du circuit :");
    circuit.coordinates.forEach(coordinate => {
      console.log(`    - Latitude: ${coordinate.lat}, Longitude: ${coordinate.lng}`);
    });
    console.log("\n");
  });
    return (
        <div className="cardLivreurDetails">
            <h3>Wael KEFI</h3>
            <div className='cardLivreurDetailsBtns'>
                <button><div className='txtBtn'>
                    <p>Commandes
                        livrées</p></div>
                    <div className='nubrBtn'>
                        <p>14</p></div></button>
                <button><div className='txtBtn'>
                    <p>Circuits
                        Parcourus</p></div>
                    <div className='nubrBtn'>
                        <p>3</p></div></button>
            </div>
            <div className='listLivContent mt-3'>
                <ul>
                    <li>
                        <div>
                            <p className='livraisonPlatTitle'> Kosksi allouche</p>
                            <p className='livraisonPlatdesc'> Asma Aounallah </p>
                            <p className='livraisonPlatdesc'>Av. Habib Bourguiba, mourouj </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className='livraisonPlatTitle'> Kosksi allouche</p>
                            <p className='livraisonPlatdesc'> Asma Aounallah </p>
                            <p className='livraisonPlatdesc'>Av. Habib Bourguiba, mourouj </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className='livraisonPlatTitle'> Kosksi allouche</p>
                            <p className='livraisonPlatdesc'> Asma Aounallah </p>
                            <p className='livraisonPlatdesc'>Av. Habib Bourguiba, mourouj </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className='livraisonPlatTitle'> Kosksi allouche</p>
                            <p className='livraisonPlatdesc'> Asma Aounallah </p>
                            <p className='livraisonPlatdesc'>Av. Habib Bourguiba, mourouj </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CardLivreurDetails