import React from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../css/reset.css";
import "../css/login.css";
import "../css/preloader.css";

const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [submitDisable, setSubmitDisable] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] = React.useState("Login");

  const loginSubmit = (e) => {
    e.preventDefault();

    setSubmitDisable(true);
    setSubmitButtonText(
      <div className="preloader-div preloader-div-mini">
        <div className="preloader-dark preloader-mini"></div>
      </div>
    );

    requestLogin(`${props.url}/login`, { username, password })
      .then((data) => {
        toast.success("Bienvenido AlfaCentauri01");
        localStorage.setItem("jwt", data.token);
        window.location.replace("/home");
      })
      .catch((response) => {
        toast.error(`Error ${response}`);
        setSubmitDisable(false);
        setSubmitButtonText("Login");
      });
  };

  const requestLogin = async function (url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  React.useEffect(() => {
    if (localStorage.getItem("jwt") != null) window.location.replace("/home");
  }, []);

  return (
    <div id="login-container">
      <main>
        <h1 className="logo">ALFA-PASSWORD</h1>
        <form action="" className="form" id="loginForm" onSubmit={loginSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="usuario"
              id="usuario"
              placeholder="Usuario"
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-field">
            <input
              type="password"
              name="contrasenia"
              id="contrasenia"
              placeholder="Contraseña"
              onChange={(e) => setpassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-button">
            <button type="submit" disabled={submitDisable}>
              {submitButtonText}
            </button>
          </div>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Login;
