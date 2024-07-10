import React from "react";
import { toast, ToastContainer } from "react-toastify";

import "../../css/home.css";

import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import Menu from "./menu";
import CardCorreo from "./cards/card_correo";
import CardSitioWeb from "./cards/card_sitio_web";

const request = async function (
  url,
  metodo,
  token,
  data,
  funcionSuccess,
  clave = ""
) {
  const config = {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (metodo !== "GET") {
    config["body"] = JSON.stringify(data);
  }

  if (clave !== "") {
    config.headers["encpasskw"] = clave;
  }

  let response = await fetch(url, config);
  if (response.ok) {
    if (metodo !== "DELETE") {
      response = response.json();
    } else {
      response = response.text();
    }
    response.then(funcionSuccess).catch((error) => {
      console.error(error);
      toast.error(`Error ${error}`);
    });
  } else {
    toast.error(`Error ${response.status}`);
    if (response.status === 401) {
      localStorage.removeItem("jwt");
      window.location.replace("/");
    }
  }
};

const Home = (props) => {
  const [jwt, setJwt] = React.useState("");

  const [correos, setCorreos] = React.useState([]);
  const [sitiosWeb, setSitiosWeb] = React.useState([]);
  const [correo, setCorreo] = React.useState({
    nombre: "",
    correo: "",
    contrasenia: "",
  });
  const [sitioWeb, setSitioWeb] = React.useState({
    nombre: "",
    url: "",
    usuario: "",
    password: "",
    loginWith: "none",
  });

  const [activeBackdrop, setActiveBackdrop] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState(false);

  const [activePreload, setActivePreload] = React.useState(true);

  const [activeCorreoCard, setActiveCorreoCard] = React.useState(false);
  const [modeCreateCorreo, setModeCreateCorreo] = React.useState(false);

  const [activeSitioWebCard, setActiveSitioWebCard] = React.useState(false);
  const [modeCreateSitioWeb, setModeCreateSitioWeb] = React.useState(false);

  // Acciones
  const actions = {
    getData() {
      setActivePreload(true);

      request(`${props.url}/api/correo`, "GET", jwt, {}, (data) => {
        setCorreos(data);
        setActiveMenu(false);
        setActiveBackdrop(false);
        setActivePreload(false);
      });

      request(`${props.url}/api/sitio-web`, "GET", jwt, {}, (data) => {
        setSitiosWeb(data);
        setActiveMenu(false);
        setActivePreload(false);
        setActiveBackdrop(false);
      });
    },

    showMenu() {
      setActiveBackdrop(true);
      setActiveMenu(true);
    },
    hiddenMenu() {
      setActiveMenu(false);
      setActiveBackdrop(false);
    },

    logout() {
      localStorage.removeItem("jwt");
      window.location.replace("/");
    },

    showCorreo(data) {
      setCorreo(data);
      setModeCreateCorreo(false);
      setActiveBackdrop(true);
      setActiveCorreoCard(true);
    },
    showCreateCorreo() {
      actions.hiddenMenu();
      setCorreo({
        nombre: "",
        correo: "",
        contrasenia: "",
      });
      setModeCreateCorreo(true);
      setActiveBackdrop(true);
      setActiveCorreoCard(true);
    },
    hiddenCorreo() {
      setActiveCorreoCard(false);
      setActiveBackdrop(false);
    },

    showSitioWeb(data) {
      setSitioWeb(data);
      setModeCreateSitioWeb(false);
      setActiveBackdrop(true);
      setActiveSitioWebCard(true);
    },
    showCreateSitioWeb() {
      actions.hiddenMenu();
      setSitioWeb({
        nombre: "",
        url: "",
        usuario: "",
        password: "",
        loginWith: "none",
      });
      setModeCreateSitioWeb(true);
      setActiveBackdrop(true);
      setActiveSitioWebCard(true);
    },
    hiddenSitioWeb() {
      setActiveSitioWebCard(false);
      setActiveBackdrop(false);
    },
  };

  // Comprobar el token
  React.useEffect(() => {
    setJwt(localStorage.getItem("jwt"));
    if (jwt == null) window.location.replace("/");
  }, [jwt, setJwt]);

  // Estructura
  return (
    <>
      <div
        className={"backdrop " + (activeBackdrop ? "" : "display-none")}
        onClick={actions.hiddenMenu}
      ></div>
      <Menu
        active={activeMenu}
        salirMenu={actions.hiddenMenu}
        getDatos={actions.getData}
        createCorreo={actions.showCreateCorreo}
        createSitoWeb={actions.showCreateSitioWeb}
      />
      <div id="home-container">
        <Header showMenu={actions.showMenu} logout={actions.logout} />
        <Main
          activePreload={activePreload}
          correos={correos}
          sitiosWeb={sitiosWeb}
          showCorreo={actions.showCorreo}
          showSitioWeb={actions.showSitioWeb}
        />
        <Footer />
      </div>
      <CardCorreo
        url={props.url}
        jwt={jwt}
        elemento={correo}
        active={activeCorreoCard}
        close={actions.hiddenCorreo}
        request={request}
        refresh={() => {
          actions.getData();
          toast.success("Informacion Actualizada");
          actions.hiddenCorreo();
        }}
        modeCreate={modeCreateCorreo}
      />
      <CardSitioWeb
        url={props.url}
        jwt={jwt}
        elemento={sitioWeb}
        active={activeSitioWebCard}
        close={actions.hiddenSitioWeb}
        request={request}
        refresh={() => {
          actions.getData();
          toast.success("Informacion Actualizada");
          actions.hiddenSitioWeb();
        }}
        modeCreate={modeCreateSitioWeb}
      />
      <ToastContainer />
    </>
  );
};

export default Home;
