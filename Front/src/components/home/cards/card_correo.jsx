import React from "react";
import "../../../css/card.css";

const CardCorreo = ({
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
  const [correo, setCorreo] = React.useState("");
  const [password, setPassword] = React.useState("");

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
            title="Crear Nuevo Correo"
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
        `${url}/api/correo`,
        "POST",
        jwt,
        { nombre: nombre, correo: correo, contrasenia: password },
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
        `${url}/api/correo/${elemento.id}`,
        "GET",
        jwt,
        {},
        (data) => {
          setPassword(data.contrasenia);
        },
        clave
      );
    },

    edit() {
      const clave = getClave();
      if (clave === "" || clave === null) return;
      request(
        `${url}/api/correo/${elemento.id}`,
        "PUT",
        jwt,
        {
          nombre: nombre,
          correo: correo,
          contrasenia: password,
        },
        (data) => {
          setNombre(data.nombre);
          setCorreo(data.correo);
          setPassword(data.contrasenia);
          refresh();
        },
        clave
      );
    },

    delete() {
      request(`${url}/api/correo/${elemento.id}`, "DELETE", jwt, {}, () => {
        refresh();
      });
    },
  };

  React.useEffect(() => {
    setNombre(elemento.nombre);
    setCorreo(elemento.correo);
    setPassword(elemento.contrasenia);
  }, [setNombre, setCorreo, setPassword, elemento]);

  return (
    <div className={"card-container " + (active ? "" : "display-none")}>
      <div className="card">
        <h3 className="titulo">CORREO</h3>
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
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              name="correo"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
        </form>
        <div className="acciones">{getButtons()}</div>
      </div>
    </div>
  );
};

export default CardCorreo;
