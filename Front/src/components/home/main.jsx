import React from "react";

import "../../css/main.css";
import MiniCard from "./cards/minicard";

const Main = ({
  activePreload,
  correos,
  sitiosWeb,
  showCorreo,
  showSitioWeb,
}) => {
  const [busqueda, setBusqueda] = React.useState("");

  const [correosFiltro, setCorreosFiltro] = React.useState([]);
  const [sitiosWebFiltro, setSitiosWebFiltro] = React.useState([]);
  let expresionRegular = null;

  const buscar = (palabra) => {
    palabra = palabra.trim();
    if (palabra !== "") {
      expresionRegular = new RegExp(`^.*${palabra}.*$`, "i");
      setCorreosFiltro(
        correosFiltro.filter((correo) => expresionRegular.test(correo.nombre))
      );
      setSitiosWebFiltro(
        sitiosWeb.filter((sitiosWeb) => expresionRegular.test(sitiosWeb.nombre))
      );
    } else {
      setCorreosFiltro([...correos]);
      setSitiosWebFiltro([...sitiosWeb]);
    }
  };

  React.useEffect(() => {
    if (busqueda === "") {
      setCorreosFiltro([...correos]);
      setSitiosWebFiltro([...sitiosWeb]);
    }
  }, [setCorreosFiltro, setSitiosWebFiltro, correos, sitiosWeb, busqueda]);

  return (
    <main>
      <div className={"preloader-div " + (activePreload ? "" : "display-none")}>
        <div className="preloader-dark"></div>
      </div>
      <div
        className={"main-container " + (activePreload ? "display-none" : "")}
      >
        <div className="buscador">
          <button type="button">BUSCAR</button>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              buscar(e.target.value);
            }}
          />
        </div>
        <div className="correos">
          <h3 className="tittle">CORREOS</h3>
          <div className="barra">
            {correosFiltro.map((item) => (
              <MiniCard key={item.id} data={item} show={showCorreo} />
            ))}
          </div>
        </div>
        <div className="sitiosWeb">
          <h3 className="tittle">SITIOS WEB</h3>
          <div className="barra">
            {sitiosWebFiltro.map((item) => (
              <MiniCard key={item.id} data={item} show={showSitioWeb} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
