
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { jwtDecode } from "jwt-decode";
import AuthenticationReducer from './reducers/AuthenticationReducer';
import { getUser } from "./services/user.service";
import ClientReducer from "./reducers/ClientReducer";
import TraiteurReducer from "./reducers/TraiteurReducer";
import platReducer from "./reducers/PlatReducer";
import PlanificationReducer from "./reducers/PlanificationReducer";
import commandeReducer from "./reducers/CommandeReducer";
import livreurReducer from "./reducers/LivreurReducer";
import envieClientReducer from "./reducers/EnvieClientReducer";
import circuitReducer from "./reducers/CircuitReducer";
import platPrincipalReducer from "./reducers/PlatPrincipalReducer";
import platAccompagnementReducer from "./reducers/PlatAccompagnement";
import CommandeEventRecuder from "./reducers/CommandeEventRecuder";
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authentification: AuthenticationReducer,
  client:ClientReducer,
  traiteur : TraiteurReducer,
  plat :platReducer,
  planification : PlanificationReducer,
  commande : commandeReducer,
  livreur :livreurReducer,
  envie : envieClientReducer,
  circuit : circuitReducer,
  platPrincipal: platPrincipalReducer,
  platAccompagnement: platAccompagnementReducer,
  commandesEvent : CommandeEventRecuder
});


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const getAsyncStorage = () => {
  return async (dispatch) => {

    let token = localStorage.getItem("@userAdmin");
    if (token) {
      // console.log("token", token)
      let decoded = jwtDecode(token);
      let user = await getUser(decoded.id)

      dispatch({
        type: "SING_IN_SUCCESS",
        payload: { user, token }
      });
    }


  };
};


store.dispatch(getAsyncStorage());
export default store;
