import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Step2Form = ({ nextStep, prevStep, updateOrderData }) => {
    // Fonction pour gérer le changement dans le formulaire
    const handleFormChange = (customerInfo) => {
        updateOrderData({ customerInfo });
    };

    const initialValues = {
        name: '',
        phone: '',
        ville: '',
        rue: '',
        date: '',
        time: '',
        quantite: null,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'),
        phone: Yup.string().required('Le téléphone est requis'),
        ville: Yup.string().required('La ville est requise'),
        rue: Yup.string().required('La rue est requise'),
        date: Yup.date().required("La date est requise"),
        time: Yup.string().required("L'heure est requise"),
        quantite: Yup.number().min(1, 'Quantité minimale de 1').required('La quantité est requise'),
    });

    const handleSubmit = (values) => {
        handleFormChange(values);
        nextStep();
    };

    return (
        <div>
         
            {/* Simule un formulaire simple */}
            <div className='col-md-6' style={{ margin: "auto" }}>
            <h3 className="stepText">Étape 2 : Remplir vos informations</h3>
                <div className="gestionContainer">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit} // Gérer la soumission du formulaire
                    >
                        {({ isValid, dirty }) => (
                            <Form style={{ width: "100%", height: '100%' }}>
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <Field className="modal-input-Addguide" type="text" name="name" placeholder="Nom" />
                                        <ErrorMessage name="name" component="span" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <Field className="modal-input-Addguide" type="text" name="phone" placeholder="Téléphone" />
                                        <ErrorMessage name="phone" component="span" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <Field className="modal-input-Addguide" type="text" name="ville" placeholder="Ville" />
                                        <ErrorMessage name="ville" component="span" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <Field className="modal-input-Addguide" type="text" name="rue" placeholder="Rue" />
                                        <ErrorMessage name="rue" component="span" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <div className="dateTimeContainer">
                                            <div className='date-section'>
                                                <Field className="modal-input-Addguide modal-date-time-inpt" type="date" name="date" />
                                                <ErrorMessage name="date" component="span" />
                                            </div>
                                            <div className='time-section'>
                                                <Field className="modal-input-Addguide" type="time" name="time" />
                                                <ErrorMessage name="time" component="span" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="culumnFormContainer">
                                        <Field className="modal-input-Addguide" type="number" name="quantite" placeholder="Quantité" />
                                        <ErrorMessage name="quantite" component="span" />
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mt-3">
                                    <button className='prevBtn' type="button" onClick={prevStep}>Précédent</button>
                                    <button className='nextBtn' type="submit" disabled={!isValid || !dirty}>Suivant</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </div>
    );
};

export default Step2Form;
