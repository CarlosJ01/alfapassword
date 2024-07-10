const Header = ({ showMenu, logout }) => {
  return (
    <header>
      <div className="menu" onClick={showMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="logo">
        <h1>ALFA PASSWORD</h1>
      </div>
      <div className="logout" onClick={logout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </header>
  );
};

export default Header;
