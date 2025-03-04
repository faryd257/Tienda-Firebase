import { Layout } from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
  return (
    <Layout>
      <div className="registro-container">
        <h1>Crear Cuenta</h1>
        <p>Regístrate para acceder a nuestras ofertas y productos exclusivos.</p>
        <form className="registro-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input type="text" id="nombre" placeholder="Ingresa tu nombre completo" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" placeholder="Ingresa tu correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="Crea una contraseña" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>
          <button type="submit" className="registro-boton">Registrarse</button>
        </form>
        <p className="login-prompt">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/Login" className="login-link">Inicia sesión aquí</Link>
        </p>
      </div>
    </Layout>
  );
};

export { Registro };

