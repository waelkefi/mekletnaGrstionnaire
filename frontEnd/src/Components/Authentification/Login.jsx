import React, { useState } from 'react'
import "./Login.css"
import image from '../../images/Groupe 584.png';
import eyeSlash from '../../images/eye-slash.svg';
import eye from '../../images/eye.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { login } from '../../redux/actions/UserAction';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Nom utilisateur obligatoire'),
  password: Yup.string().required('Mot de passe obligatoire'),
});

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [open, setOpen] = useState(false);

  // const isLoading=useSelector(state => state.authentification.isLoading)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async (values) => {

    await dispatch(login(values)).then(result => {

      if (result) {
        // console.log(result)
        // console.log("loggin success")
        // if role guide then redirect to home 
        if (result.role === "GESTIONAIRE") {
          navigate("/");
        }
        // else if (result.role === "ADMIN") {
        //   navigate("/admin/");
        // }

      }
      else {
        setOpen(true)
      }
    })
  }

  return (
    <div className="container">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Nom d'utilisateur ou mot de passe inconrrect
        </Alert>
      </Snackbar>
      <div className="login-box">
        <div className="login-box-left">
          <img src={image} alt="mekletna-login" />
        </div>
        <div className="login-body">
          <Formik
            enableReinitialize
            validationSchema={validationSchema}

            initialValues={{
              userName: "",
              password: "",

            }}
            onSubmit={(values, actions) => {

              handleLogin(values);

            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldValue,
            }) => (
              <div className="form-container-login">
                <div className="form-group">
                  <label htmlFor="username" className="label-login">Nom d'utilisateur</label>

                  <input type="text"
                    placeholder="Nom d'utilisateur"
                    className="input-field-login"
                    id="username"
                    name="userName"
                    onChange={handleChange("userName")}
                    onBlur={handleBlur("userName")}
                    value={values.userName}
                  />


                  {errors.userName && touched.userName && (
                    <span className="errorText">
                      {errors.userName}
                    </span>
                  )}

                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label-login">Mot de passe</label>
                  <div className="password-input-container">
                    <input
                      type={passwordHidden ? 'password' : 'text'}
                      placeholder='Mot de passe'
                      className="input-field-login"
                      id="password"
                      name="password"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={() => setPasswordHidden(!passwordHidden)}
                    >
                      <img src={passwordHidden ? eyeSlash : eye} alt="icon" />

                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <span className="errorText">
                      {errors.password}
                    </span>
                  )}
                </div>
                <button type="submit" onClick={handleSubmit} className="button-login">Se connecter</button>
                <Link to='/forgetPassword' className="login-password-link">

                  <p> Mot de passe oublié?</p>
                </Link>
              </div>
            )}
          </Formik>

        </div>
      </div>
    </div>
  )
}

export default Login