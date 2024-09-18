import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {jwtDecode} from "jwt-decode";
import { getUser } from '../redux/services/user.service';


const PrivateRoute = ({ children, requiredRole }) => {

    const navigate = useNavigate()

    const user = useSelector(state => state.authentification.user)
    //const token = useSelector(state => state.authentification.userToken)
    const token = localStorage.getItem("@userAdmin");

    useEffect(() => {
        if (!token) {
            console.log("Token not found");
            navigate('/');
        } else {
            const jwt_Token_decoded = jwtDecode(token);
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                localStorage.clear();
                console.log("Token expired");
                navigate('/');
            }

            // to test role so fetch user by id 
            getUser(jwt_Token_decoded.id).then(user => {
                if(user) {
                    if (user?.role !== requiredRole) {
                        console.log("Role not authorized");
                        navigate('/404');
                    }
                }
               
            })

        }
    }, [navigate, token, user, requiredRole]);

    return children;





}

export default PrivateRoute;