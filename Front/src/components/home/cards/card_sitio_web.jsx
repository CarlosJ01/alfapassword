import React from "react";
import "../../../css/card.css";

const CardSitioWeb = ({
  url,
  jwt,
  elemento,
  active,
  close,
  request,
  refresh,
  modeCreate,
}) => {
  const [nombre, setNombre] = React.useState("");
  const [urlSitio, setUrlSitio] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginWith, setLoginWith] = React.useState("");

  const getClave = () => {
    const clave = window.prompt("Ingresa la Key", "");
    if (clave === "" || clave === null) return "";
    return clave.trim();
  };

  const getButtons = () => {
    if (!modeCreate) {
      return (
        <>
          <button
            type="button"
            title="Revelar Contraseña"
            onClick={actions.getPassword}
          >
            <i className="fa-solid fa-eye"></i>
          </button>
          <button type="button" title="Editar" onClick={actions.edit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" title="Eliminar" onClick={actions.delete}>
            <i className="fa-solid fa-trash"></i>
          </button>
          <button type="button" title="Cerrar" onClick={close}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className="button-3"
            type="button"
            title="Crear Nuevo Sitio Web"
            onClick={actions.create}
          >
            <i className="fa-solid fa-circle-check"></i>
          </button>
          <button
            className="button-4"
            type="button"
            title="Cerrar"
            onClick={close}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </>
      );
    }
  };

  const actions = {
    create() {
      const clave = getClave();
      if (clave === "" || clave === null) return;
      request(
        `${url}/api/sitio-web`,
        "POST",
        jwt,
        { nombre, url: urlSitio, usuario, password, loginWith },
        () => {
          refresh();
        },
        clave
      );
    },

    getPassword() {
      const clave = getClave();
      if (clave === "" || clave === null) return;
      request(
        `${url}/api/sitio-web/${elemento.id}`,
        "GET",
        jwt,
        {},
        (data) => {
          setPassword(data.password);
        },
        clave
      );
    },

    edit() {
      const clave = getClave();
      if (clave === "" || clave === null) return;
      request(
        `${url}/api/sitio-web/${elemento.id}`,
        "PUT",
        jwt,
        { nombre, url: urlSitio, usuario, password, loginWith },
        (data) => {
          setNombre(data.nombre);
          setUrlSitio(data.url);
          setUsuario(data.usuario);
          setPassword(data.password);
          setLoginWith(data.loginWith);
          refresh();
        },
        clave
      );
    },

    delete() {
      request(`${url}/api/sitio-web/${elemento.id}`, "DELETE", jwt, {}, () => {
        refresh();
      });
    },
  };

  React.useEffect(() => {
    setNombre(elemento.nombre);
    setUrlSitio(elemento.url);
    setUsuario(elemento.usuario);
    setPassword(elemento.password);
    setLoginWith(elemento.loginWith);
  }, [setNombre, setUrlSitio, setUsuario, setPassword, setLoginWith, elemento]);

  return (
    <div className={"card-container " + (active ? "" : "display-none")}>
      <div className="card">
        <h3 className="titulo">SITIO WEB</h3>
        <form action="" className="form-container">
          <div className="form-element">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-element">
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              name="url"
              id="url"
              value={urlSitio}
              onChange={(e) => setUrlSitio(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-element">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="email"
              name="usuario"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-element-radio">
            <label htmlFor="loginWith">Login con : </label>
            <div className="elements-radio">
              <div className="element-radio">
                <div className="logo">
                  <i className="fa-brands fa-google"></i>
                </div>
                <div className="nombre">CarlosJ</div>
                <input
                  type="radio"
                  name="loginWith"
                  id="loginWith"
                  value={"googleCarlosJ"}
                  checked={loginWith === "googleCarlosJ"}
                  onChange={(e) => {
                    setLoginWith(e.target.value);
                  }}
                />
              </div>
              <div className="element-radio">
                <div className="logo">
                  <i className="fa-brands fa-google"></i>
                </div>
                <div className="nombre">Apolyon</div>
                <input
                  type="radio"
                  name="loginWith"
                  id="loginWith"
                  value={"googleApolyon"}
                  checked={loginWith === "googleApolyon"}
                  onChange={(e) => {
                    setLoginWith(e.target.value);
                  }}
                />
              </div>
              <div className="element-radio">
                <div className="logo">
                  <i className="fa-brands fa-facebook"></i>
                </div>
                <div className="nombre">Facebook</div>
                <input
                  type="radio"
                  name="loginWith"
                  id="loginWith"
                  value={"facebook"}
                  checked={loginWith === "facebook"}
                  onChange={(e) => {
                    setLoginWith(e.target.value);
                  }}
                />
              </div>
              <div className="element-radio">
                <div className="logo">
                  <i className="fa-brands fa-microsoft"></i>
                </div>
                <div className="nombre">Hotmail</div>
                <input
                  type="radio"
                  name="loginWith"
                  id="loginWith"
                  value={"hotmail"}
                  checked={loginWith === "hotmail"}
                  onChange={(e) => {
                    setLoginWith(e.target.value);
                  }}
                />
              </div>
              <div className="element-radio">
                <div className="logo">
                  <i className="fa-solid fa-ban"></i>
                </div>
                <div className="nombre">None</div>
                <input
                  type="radio"
                  name="loginWith"
                  id="loginWith"
                  value={"none"}
                  checked={loginWith === "none"}
                  onChange={(e) => {
                    setLoginWith(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="acciones">{getButtons()}</div>
      </div>
    </div>
  );
};

export default CardSitioWeb;
