import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext"; 
import "./Header.css";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user } = useAuth();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src="/2.jpg" alt="logo" />
          <span className="logo-text">Faryd Ortiz</span>
        </div>
        <button
          className="menu-icono"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </button>
        <nav className={menuAbierto ? "menu abierto" : "menu"}>
          <ul>
            <li>
              <Link to="/" onClick={cerrarMenu}>
                Home
              </Link>
            </li>
           
            <li>
              <Link to="/Login" onClick={cerrarMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/Registro" onClick={cerrarMenu}>
                Registro
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/admin" onClick={cerrarMenu}>
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <button className="cerrar-menu" onClick={cerrarMenu}>
            Cerrar
          </button>
        </nav>
      </div>
    </header>
  );
};

export { Header };
