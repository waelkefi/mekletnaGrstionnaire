import React from 'react'
import "./Cards.css"
function CommandeCard({ commande }) {
    let prix = 0
    for (let i=0; i< commande.plats.length; i++) {
      prix = prix + (commande.plats[i].plat.price * commande.plats[i].quantity)
  
    }
    
    return (
        <div className="CommandeCard">
            <h3>{commande?.client?.firstName} {commande?.client?.lastName}</h3>
            <p className='commandeText'>{commande?.client?.address?.streetBuilding} {commande?.client?.address?.state} {commande?.client?.address?.country}</p>

            <p className='commandeLabel'>Date et heure de livraison</p>
            <div className='commandeCardDateContainer '>
                <p className='commandeText'>{commande?.date.toString().slice(0, 10)}</p>
                <p className='commandeText' style={{marginLeft:"8px"}}>{commande?.time}</p>
            </div>

            <p className='commandeLabel'>Laboratoire/ traiteur</p>
            <p className='commandeText'> {commande.traiteur.firstName} {commande.traiteur.lastName}</p>

            <p className='commandeLabel'> Plats </p>
            {
                commande.plats.length > 0 && commande.plats.map(e => 
                    <div className='commandeCardPlats mb-2' key={e._id}>
                        <p className='commandeText'>- {e.plat.name} x{e.quantity}</p>
                        <p className='platInstructionsText'>{e.remarque}</p>
                    </div>
                )
            }
            <p className='commandeLabel'>Montant à payer</p>
            <p className='commandeText'>{prix} dt</p>

        </div>
    )
}

export default CommandeCard