import React, { useState } from 'react'
import DeleteConfirmationModal from '../../Components/Modals/DeleteConfirmationModal';
import { deletePlatPrincipal } from "../../redux/actions/PlatPrincipalAction";
import { useDispatch } from 'react-redux';
import { deletePlatAccompagnement } from '../../redux/actions/AccompagnementAction';
const API = process.env.REACT_APP_API_URL_IMAGE;

function CardPlat({ plat, handleSelectDish, handleAddSideDish, sideDish }) {
    // const dispatch = useDispatch()
    // const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    // const handleDelete = async () => {
    //     try {
    //         if (!sideDish) {
    //             await dispatch(deletePlatPrincipal(plat._id));
    //         } else {
    //             await dispatch(deletePlatAccompagnement(plat._id));
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la suppression du plat :', error);
    //     }
    // };

    return (
        <div>
            <button onClick={() => !sideDish ? handleSelectDish(plat) : handleAddSideDish(plat)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17.818" height="17.818" viewBox="0 0 17.818 17.818">
                    <path id="Icon_material-add-to-photos" data-name="Icon material-add-to-photos" d="M4.782,6.564H3V19.036a1.787,1.787,0,0,0,1.782,1.782H17.254V19.036H4.782ZM19.036,3H8.345A1.787,1.787,0,0,0,6.564,4.782V15.472a1.787,1.787,0,0,0,1.782,1.782H19.036a1.787,1.787,0,0,0,1.782-1.782V4.782A1.787,1.787,0,0,0,19.036,3Zm-.891,8.018H14.582v3.564H12.8V11.018H9.236V9.236H12.8V5.673h1.782V9.236h3.564Z" transform="translate(-3 -3)" fill="#5e8214" />
                </svg>

            </button>
            <div className="PlatCard" style={{ alignItems: "center" }}>
                <div className="PlatCardImg">
                    <img src={`${API}${plat.image}`} alt="imagePlatMekletna.tn" />
                </div>
                <div className="PlatCardText">
                    <h3>{plat.name}</h3>
                    <p>{plat.price} €</p>
                </div>
                {/* <button onClick={() => setConfirmationModalOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.554" height="14.855" viewBox="0 0 11.554 14.855">
                        <path id="Icon_material-delete-forever" data-name="Icon material-delete-forever" d="M8.325,17.7a1.655,1.655,0,0,0,1.651,1.651h6.6A1.655,1.655,0,0,0,18.228,17.7V7.8h-9.9Zm2.03-5.876,1.164-1.164,1.758,1.75,1.75-1.75,1.164,1.164-1.75,1.75,1.75,1.75-1.164,1.164-1.75-1.75-1.75,1.75-1.164-1.164,1.75-1.75Zm5.81-6.5L15.34,4.5H11.214l-.825.825H7.5V6.976H19.054V5.325Z" transform="translate(-7.5 -4.5)" fill="#b6b7b7" />
                    </svg>
                </button> */}

            </div>
            {/* <DeleteConfirmationModal
                isOpen={isConfirmationModalOpen}
                onDelete={handleDelete}
                onClose={() => setConfirmationModalOpen(false)}
            /> */}
        </div>
    )
}

export default CardPlat