import { useEffect, useState } from "react";
import { getAllPlatsPrincipal } from "../../../redux/actions/PlatPrincipalAction";
import { getAllPlatsAccompagnement } from "../../../redux/actions/AccompagnementAction";
import { useDispatch, useSelector } from "react-redux";
import CardPlat from "../../../Pages/Menu/CardPlat";
import LoadingAnimation from "../../animation/LoadingAnimation";
// import EmptyAnimation from "../../animation/EmptyAnimation";
import imagePlat from "../../../images/plat.png";
const API = process.env.REACT_APP_API_URL_IMAGE;
const Step1Composition = ({ nextStep, updateOrderData, orderData }) => {
  // Fonction pour gérer la sélection des ingrédients
  const handleCompositionChange = (composition) => {
    updateOrderData({ composition });
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dishes = useSelector((state) => state.platPrincipal.platsPrincipaux);
  const sideDishes = useSelector((state) => state.platAccompagnement.platsAccompagnement);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedSideDishes, setSelectedSideDishes] = useState([]);
  const [dishImage, setDishImage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getAllPlatsPrincipal());
        await dispatch(getAllPlatsAccompagnement());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSelectDish = (dish) => {
    if (!selectedDish) {
      setSelectedDish(dish);
      setDishImage(dish.image);
      setTotalPrice(dish.price);
      setSelectedSideDishes([]);
    } else {
      alert("Vous avez déjà sélectionné un plat principal. Veuillez le retirer pour en choisir un autre.");
    }
  };

  const handleRemoveDish = () => {
    setSelectedDish(null);
    setDishImage("");
    setTotalPrice(0);
    setSelectedSideDishes([]);
  };

  const handleAddSideDish = (sideDish) => {
    if (!selectedSideDishes.includes(sideDish)) {
      setSelectedSideDishes([...selectedSideDishes, sideDish]);
      setTotalPrice(totalPrice + sideDish.price);
    }
  };

  const handleRemoveSideDish = (sideDishId) => {
    const updatedSideDishes = selectedSideDishes.filter((sideDish) => sideDish._id !== sideDishId);
    const removedSideDish = selectedSideDishes.find((sideDish) => sideDish._id === sideDishId);
    setSelectedSideDishes(updatedSideDishes);
    setTotalPrice(totalPrice - removedSideDish.price);
  };

  const filteredSideDishes = selectedDish
    ? sideDishes.filter(
        (sideDish) =>
          sideDish.compatibleDishes.some((compatibleDish) => compatibleDish._id === selectedDish._id) &&
          !selectedSideDishes.includes(sideDish) // Exclure les garnitures déjà sélectionnées
      )
    : [];

  return (
    <div>
      
      <div className="col-md-6" style={{ margin: "auto" }}>
      <h3 className="stepText">Étape 1 : Composition du plat</h3>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <div className="gestionContainer">
            {!selectedDish ? (
              <h4>Choisissez votre plat principal</h4>
            ) : (
              <h4>Plat Principal</h4>
            )}

            <div className="gestionContainerBodyClient">
              {!selectedDish ? (
                dishes.map((plat) => (
                  <CardPlat key={plat._id} plat={plat} sadeDish={false} handleSelectDish={handleSelectDish} />
                ))
              ) : (
                <div className="selected-dish">
                  <div>
                    <img src={`${API}${selectedDish.image}`} alt="imagePlatMekletna.tn" />
                    <div className="selectedDishDesc">
                      <p>{selectedDish.name}</p>
                      <p className="priceDish">{selectedDish.price} €</p>
                    </div>
                  </div>

                  <button onClick={handleRemoveDish}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13.109" height="16.855" viewBox="0 0 13.109 16.855">
                      <path
                        id="Icon_material-delete-forever"
                        data-name="Icon material-delete-forever"
                        d="M8.436,19.482a1.878,1.878,0,0,0,1.873,1.873H17.8a1.878,1.878,0,0,0,1.873-1.873V8.245H8.436Zm2.3-6.667,1.32-1.32,1.994,1.985,1.985-1.985,1.32,1.32L15.375,14.8l1.985,1.985-1.32,1.32L14.055,16.12l-1.985,1.985-1.32-1.32L12.734,14.8Zm6.592-7.379L16.4,4.5H11.714l-.936.936H7.5V7.309H20.609V5.436Z"
                        transform="translate(-7.5 -4.5)"
                        fill="#5e8214"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {selectedDish && (
              <div className="gestionContainerBodyClient">
                {selectedSideDishes.length > 0 && <h4>Garniture</h4>}
                {selectedSideDishes.length > 0 &&
                  selectedSideDishes.map((sideDish) => (
                    <div key={sideDish._id} className="selected-dish">
                      <div>
                        <img src={`${API}${sideDish.image}`} alt="imagePlatMekletna.tn" />
                        <div className="selectedDishDesc">
                          <p>{sideDish.name}</p>
                          <p className="priceDish">{sideDish.price} €</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveSideDish(sideDish._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.818" height="17.818" viewBox="0 0 17.818 17.818">
                          <path
                            id="Icon_material-delete-forever"
                            data-name="Icon material-delete-forever"
                            d="M8.436,19.482a1.878,1.878,0,0,0,1.873,1.873H17.8a1.878,1.878,0,0,0,1.873-1.873V8.245H8.436Zm2.3-6.667,1.32-1.32,1.994,1.985,1.985-1.985,1.32,1.32L15.375,14.8l1.985,1.985-1.32,1.32L14.055,16.12l-1.985,1.985-1.32-1.32L12.734,14.8Zm6.592-7.379L16.4,4.5H11.714l-.936.936H7.5V7.309H20.609V5.436Z"
                            transform="translate(-7.5 -4.5)"
                            fill="#5e8214"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                {filteredSideDishes.length > 0 && <h4>Choisissez vos Garnitures</h4>}
                {filteredSideDishes.length > 0 &&
                  filteredSideDishes.map((sideDish) => (
                    <CardPlat
                      key={sideDish._id}
                      plat={sideDish}
                      sideDish={true}
                      handleAddSideDish={handleAddSideDish}
                    />
                  ))}
              </div>
            )}
            <div className="d-flex flex-row justify-content-end mt-3">
              <button
                style={{ width: "150px" }}
                className="nextBtn"
                onClick={() => {
                  handleCompositionChange({  platPrincipal: selectedDish,
                    accompagnements: selectedSideDishes, PlatPrice:totalPrice});
                  nextStep();
                }}
                disabled={!selectedDish || selectedSideDishes.length === 0} // Désactive le bouton si aucun plat principal ou aucune garniture n'est sélectionné
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1Composition;
