import React, { useState } from 'react'
import DeleteConfirmationModal from '../../Components/Modals/DeleteConfirmationModal';
import { deletePlatPrincipal } from "../../redux/actions/PlatPrincipalAction";
import { useDispatch } from 'react-redux';
import { deletePlatAccompagnement } from '../../redux/actions/AccompagnementAction';
import PlatDetailsModal from '../../Components/Modals/PlatDetailsModal';
const API = process.env.REACT_APP_API_URL_IMAGE;

function CardPlatEvent({ plat, sideDish }) {
    const dispatch = useDispatch()
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [PlatModalOpen, setPlatModalOpen] = useState(false)
    const handleDelete = async () => {
        try {
            if (!sideDish) {
                await dispatch(deletePlatPrincipal(plat._id));
            } else {
                await dispatch(deletePlatAccompagnement(plat._id));
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du plat :', error);
        }
    };
    const des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet posuere nulla, fermentum ultricies sapien. In cursus sit amet tellus quis tincidunt. In eu dapibus arcu, at lacinia leo. Nam vitae turpis imperdiet, pellentesque ipsum et, fringilla risus."
    return (
        <div>
            <div className="PlatCard platEventPersonalisé" style={{ alignItems: "center" }} onClick={()=>setPlatModalOpen(true)}>
                <div className="PlatCardImg">
                    <img src={`${API}${plat.image}`} alt="imagePlatMekletna.tn" />
                </div>
                <div className="PlatCardText">
                    <h3>{plat.name}</h3>
                    <p> {plat?.description.length > 10 ? plat.description.slice(0,9).concat('...') : plat?.description }</p>
                    <p>{plat.price} €</p>
                </div>
                <button onClick={() => setConfirmationModalOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.554" height="14.855" viewBox="0 0 11.554 14.855">
                        <path id="Icon_material-delete-forever" data-name="Icon material-delete-forever" d="M8.325,17.7a1.655,1.655,0,0,0,1.651,1.651h6.6A1.655,1.655,0,0,0,18.228,17.7V7.8h-9.9Zm2.03-5.876,1.164-1.164,1.758,1.75,1.75-1.75,1.164,1.164-1.75,1.75,1.75,1.75-1.164,1.164-1.75-1.75-1.75,1.75-1.164-1.164,1.75-1.75Zm5.81-6.5L15.34,4.5H11.214l-.825.825H7.5V6.976H19.054V5.325Z" transform="translate(-7.5 -4.5)" fill="#b6b7b7" />
                    </svg>
                </button>

            </div>
             <PlatDetailsModal
               isOpen={PlatModalOpen}
               onClose={() => setPlatModalOpen(false)}
               plat={plat}
             />

            <DeleteConfirmationModal
                isOpen={isConfirmationModalOpen}
                onDelete={handleDelete}
                onClose={() => setConfirmationModalOpen(false)}
            />
        </div>
    )
}

export default CardPlatEvent