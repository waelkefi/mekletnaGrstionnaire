const Step3Validation = ({ prevStep, handleValidation, orderData }) => {

    return (
        <div>

            <div className='col-md-6' style={{ margin: "auto" }}>
                <h3 className="stepText">Étape 3 : Validation de la commande</h3>
                <div className="gestionContainer"><h5><strong>Composition du plat :</strong></h5>
                    <p><strong>Plat Principal :</strong></p>
                    <ul>
                        {orderData?.composition &&
                            <li key={orderData?.composition?.platPrincipal._id}>{orderData?.composition?.platPrincipal.name}</li>
                        }
                    </ul>
                    <p><strong>Garnitures :</strong></p>
                    <ul>
                        {orderData?.composition && orderData?.composition?.accompagnements.map((plat) => (
                            <li key={plat._id}>{plat.name}</li>
                        ))}
                    </ul>

                    <h5><strong>Informations client :</strong></h5>
                    <ul>
                        <li><b>Nom:</b>  {orderData?.customerInfo?.name}</li>
                        <li><b>Téléphone:</b> {orderData?.customerInfo?.phone}</li>
                        <li><b>Adresse:</b> {orderData?.customerInfo?.rue} {orderData?.customerInfo?.ville}</li>
                        <li><b>Date:</b> {orderData?.customerInfo?.date} {orderData?.customerInfo?.time}</li>
                    </ul>

                    <h5><strong>Montant à Payé : {orderData?.composition?.PlatPrice} dt * {orderData.customerInfo.quantite} = {orderData?.composition?.PlatPrice * orderData.customerInfo.quantite} dt</strong></h5>
                    <div className="d-flex flex-row justify-content-between mt-3">
                        <button onClick={prevStep} className="prevBtn">Précédent</button>
                        <button onClick={handleValidation} className="nextBtn">Valider</button></div>
                </div>
            </div>
        </div >
    );
};

export default Step3Validation;
