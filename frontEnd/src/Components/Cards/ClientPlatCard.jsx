import React, {useState} from 'react'
import './Cards.css'
import  AddCommandeClientModal  from "../../Components/Modals/AddCommandeClientModal";
const API = process.env.REACT_APP_API_URL;
function ClientPlatCard({ plat }) {
    
    const [modalOpenAddCommande, setModalOpenAddCommande] = useState(false);
    const openModalAddCommande = () => {
        setModalOpenAddCommande(true);
    };
    const closeModalAddCommande = () => {
        setModalOpenAddCommande(false);
    };
    return (
        <div className='clientPlatCard'>
            <div className='clientPlatCardImage'>
            <img src={`${API}${plat.plat.image}`} alt="imagePlatMekletna.tn" />
            </div>
            <div className='clientPlatCardDescreption'>
                <div>
                    <h3>{plat.plat.name}</h3>
                    <p>{plat.plat.description}</p>
                </div>

                <div className='clientPlatCardAction'>
                    <p>{plat.plat.price} dt</p> <button onClick={()=>openModalAddCommande()}>Commander</button>
                </div>
            </div>

            {
                modalOpenAddCommande && <AddCommandeClientModal plat={plat.plat} isOpen={modalOpenAddCommande} onClose={closeModalAddCommande} />
            }
        </div>
    )
}

export default ClientPlatCard