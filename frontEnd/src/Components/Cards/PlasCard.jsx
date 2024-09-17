import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePlat } from '../../redux/actions/PlatAction';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import UpdatePlatModal from '../Modals/UpdatePlatModal';


const API = process.env.REACT_APP_API_URL;

function PlasCard({ _id, name, traiteur, image }) {
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await dispatch(deletePlat(_id));
    } catch (error) {
      console.error('Erreur lors de la suppression du plat :', error);
    }
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  return (
    <div className="PlatCard">
      <div className="PlatCardImg">
        <img src={`${API}${image}`} alt="imagePlatMekletna.tn" />
      </div>
      <div className="PlatCardText">
        <h3>{name}</h3>
        <p>{traiteur.firstName} {traiteur.lastName}</p>
      </div>
      <div className="PlatCardBtns">
        <button  onClick={handleUpdate}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14.857" height="14.857" viewBox="0 0 14.857 14.857">
            <path id="Icon_material-edit" data-name="Icon material-edit" d="M4.5,16.258v3.095H7.595l9.127-9.127L13.627,7.131ZM19.115,7.832a.822.822,0,0,0,0-1.164L17.184,4.738a.822.822,0,0,0-1.164,0l-1.51,1.51,3.095,3.095Z" transform="translate(-4.5 -4.496)" fill="#b6b7b7" />
          </svg>
        </button>
        <button onClick={() => setConfirmationModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11.554" height="14.855" viewBox="0 0 11.554 14.855">
            <path id="Icon_material-delete-forever" data-name="Icon material-delete-forever" d="M8.325,17.7a1.655,1.655,0,0,0,1.651,1.651h6.6A1.655,1.655,0,0,0,18.228,17.7V7.8h-9.9Zm2.03-5.876,1.164-1.164,1.758,1.75,1.75-1.75,1.164,1.164-1.75,1.75,1.75,1.75-1.164,1.164-1.75-1.75-1.75,1.75-1.164-1.164,1.75-1.75Zm5.81-6.5L15.34,4.5H11.214l-.825.825H7.5V6.976H19.054V5.325Z" transform="translate(-7.5 -4.5)" fill="#b6b7b7" />
          </svg>
        </button>
      </div>
      <DeleteConfirmationModal
        isOpen={isConfirmationModalOpen}
        onDelete={handleDelete}
        onClose={() => setConfirmationModalOpen(false)}
      />
      {isUpdateModalOpen && (
        <UpdatePlatModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          plat={{ _id, name, traiteur, image }} 
        />
      )}
    </div>
  );
}

export default PlasCard;
