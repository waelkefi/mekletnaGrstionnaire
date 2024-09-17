import React, { useState } from 'react'
import "./Cards.css"
import imagePlat from "../../images/plat.png"
import { deletePlanification } from '../../redux/actions/PlanificationAction';
import { useDispatch } from 'react-redux';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
function PlatsPlaningCard({ plat }) {
    const dispatch = useDispatch()
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const handleDelete = async () => {
       try {
         await dispatch(deletePlanification(plat._id));
       } catch (error) {
         console.error('Erreur lors de la suppression du plat :', error);
       }
     };
    return (

        <div className="cardPlanContainer">
            <div className="cardPlanLeft">
                <img src={imagePlat} alt="imagePlatMekletna.tn" />
            </div>
            <div className="cardPlanMiddle">
                <h3>{plat.plat.name}</h3>
                <p>{plat.plat.traiteur.firstName} {plat.plat.traiteur.lastName}</p>
            </div>
            <div className="cardPlanRight">
                <button  onClick={() => setConfirmationModalOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" width="13.109" height="16.855" viewBox="0 0 13.109 16.855">
                    <path id="Icon_material-delete-forever" data-name="Icon material-delete-forever" d="M8.436,19.482a1.878,1.878,0,0,0,1.873,1.873H17.8a1.878,1.878,0,0,0,1.873-1.873V8.245H8.436Zm2.3-6.667,1.32-1.32,1.994,1.985,1.985-1.985,1.32,1.32L15.375,14.8l1.985,1.985-1.32,1.32L14.055,16.12l-1.985,1.985-1.32-1.32L12.734,14.8Zm6.592-7.379L16.4,4.5H11.714l-.936.936H7.5V7.309H20.609V5.436Z" transform="translate(-7.5 -4.5)" fill="#b6b7b7" />
                </svg>
                </button>
                <p>{plat.plat.price} dt</p>
            </div>
            <DeleteConfirmationModal
                isOpen={isConfirmationModalOpen}
                onDelete={handleDelete}
                onClose={() => setConfirmationModalOpen(false)}
            />
            
        </div>


    )
}

export default PlatsPlaningCard