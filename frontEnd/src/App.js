import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Authentification/Login';
import { useSelector } from "react-redux";

import GestionnaireRoute from './Routes/GestionnaireRoute';
import PrivateRoute from './Routes/PrivateRoute';
import LandingPage from './Pages/LandingPage/LandingPage';
import LandingRoutes from './Routes/LandingRoute';
// import ForgetPassword from './pages/login/ForgetPassword';
// import ResetPassword from './pages/login/ResetPassword';



function App() {

  const user = useSelector(state => state.authentification.user);
  const token = useSelector(state => state.authentification.userToken);



  return (
    <Routes>
      {/* <Route path="/"
        element={token ?
          user.role === "GESTIONAIRE" &&
          <Navigate to="/" />
          : <LandingPage />}
      /> */}
      <Route
        path="/"
        element={
          token ? (
            user?.role === "GESTIONAIRE" ? (
              <PrivateRoute requiredRole="GESTIONAIRE">
                <GestionnaireRoute />
              </PrivateRoute>
            ) : (
              <LandingRoutes />
            )
          ) : (
            <LandingRoutes />
          )
        }
      />
      <Route path="/404"
        element={NotFound}
      />
      <Route
        path="/*"
        element={
          token ? (
            user?.role === "GESTIONAIRE" ? (
              <PrivateRoute requiredRole="GESTIONAIRE">
                <GestionnaireRoute />
              </PrivateRoute>
            ) : (
              <LandingRoutes />
            )
          ) : (
            <LandingRoutes />
          )
        }
      />


  
      {/* <Route path="/forgetPassword" element={< ForgetPassword />} />
      <Route path='password-reset/:userId/:token' element={<ResetPassword />} /> */}
    </Routes>

  );
}

const NotFound = () => <h2>Page Not Found</h2>;

export default App;