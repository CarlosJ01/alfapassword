import "../../css/menu.css";

const Menu = ({ active, salirMenu, getDatos, createCorreo, createSitoWeb }) => {
  return (
    <div className={"menu-nav " + (active ? "" : "display-none")}>
      <nav>
        <h2> ACCIONES</h2>
        <ul>
          <li onClick={createCorreo}>
            NUEVO CORREO <i className="fa-solid fa-envelope"></i>
          </li>
          <li onClick={createSitoWeb}>
            NUEVO SITIO WEB <i className="fa-solid fa-globe"></i>
          </li>
          <li>
            <a
              href="https://www.lastpass.com/es/features/password-generator"
              target="_blank"
              rel="noreferrer"
            >
              GENERADOR
            </a>
            <i className="fa-solid fa-key"></i>
          </li>
          <li onClick={getDatos}>
            DATOS
            <i className="fa-solid fa-download"></i>
          </li>
          <li onClick={salirMenu}>
            SALIR
            <i className="fa-solid fa-arrow-left"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
