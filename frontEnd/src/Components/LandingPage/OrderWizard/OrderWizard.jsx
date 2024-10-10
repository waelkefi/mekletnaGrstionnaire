import React, { useState } from 'react'
import Step1Composition from './Step1Composition';
import Step2Form from './Step2Composition';
import Step3Validation from './Step3Composition';
import { addCommande } from '../../../redux/actions/CommandeEventActions';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ModalAnimation from '../../Modals/ModalAnimation';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const OrderWizard = () => {
    const dispatch = useDispatch()
    const [BeginPersonalisation, setBeginPersonalisation] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const successAdd = async () => {
        openModal();
        await new Promise(resolve => setTimeout(resolve, 3000));
        closeModal();
    };
    // Etat pour gérer l'étape actuelle
    const [step, setStep] = useState(1);

    // Etat pour stocker les données de la commande
    const [orderData, setOrderData] = useState({
        composition: {}, // stocke la composition du plat
        customerInfo: {}, // stocke les infos du formulaire
    });

    // Fonction pour gérer la progression
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Fonction pour mettre à jour les données de commande
    const handleUpdateOrderData = (data) => {
        setOrderData({ ...orderData, ...data });
    };

    const handleValidation = async () => {
        try {
            // Lancer la commande
            const commandeData = {
                platPrincipal: orderData?.composition?.platPrincipal,
                accompagnements: orderData?.composition?.accompagnements,
                client: {
                    nom: orderData?.customerInfo?.name,
                    telephone: orderData?.customerInfo?.phone,
                    ville: orderData?.customerInfo?.ville,
                    rue: orderData?.customerInfo?.rue,
                },
                dateLivraison: orderData?.customerInfo?.date,
                timeLivraison: orderData?.customerInfo?.time,
                quantite: orderData?.customerInfo?.quantite,
                prixPlat: orderData?.composition?.PlatPrice
            };

            const commande = await dispatch(addCommande(commandeData));

            if (commande.success) {
                // handleRemoveDish(); // Reset selected dish
                // setSelectedSideDishes([]);
                // resetForm(); // Reset form values
                await successAdd();
                await setBeginPersonalisation(false)
                await setStep(1)
                
            } else {
                setIsAlertOpen(true);
            }
        } catch (error) {
            setIsAlertOpen(true);
        }
    };




    return (
        <div className='mb-5'>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isAlertOpen}
                autoHideDuration={2000}
                onClose={() => setIsAlertOpen(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Erreur d'Ajout Plat !
                </Alert>
            </Snackbar>
            {modalOpen &&
                <ModalAnimation isOpen={modalOpen} onClose={closeModal} message="Commande ajouté avec succès" />

            }

            {
                !BeginPersonalisation ? (
                    <div style={{ maxWidth: "300px", margin:"0 auto 20px",display: "flex",
                        justifyContent: "center" }}>
                        <button onClick={() => setBeginPersonalisation(true)}
                            className="confirm-btn" style={{ width: "150px"}}>Commencer</button>
                    </div>
                ) : (
                    <>
                        {step === 1 && (
                            <Step1Composition
                                nextStep={nextStep}
                                updateOrderData={handleUpdateOrderData}
                                orderData={orderData}
                            />
                        )}
                        {step === 2 && (
                            <Step2Form
                                nextStep={nextStep}
                                prevStep={prevStep}
                                updateOrderData={handleUpdateOrderData}
                                orderData={orderData}
                            />
                        )}
                        {step === 3 && (
                            <Step3Validation
                                prevStep={prevStep}
                                handleValidation={handleValidation}
                                orderData={orderData}
                            />
                        )}
                    </>
                )
            }


        </div>
    );
};

export default OrderWizard;
