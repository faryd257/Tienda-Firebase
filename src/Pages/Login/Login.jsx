
import { Layout } from "../../components/Layout/Layout";
import { login, logout } from "../../../config/auth";
import { useAuth } from "../../context/UserContext";
import "./Login.css";

const Login = () => {
  const { user, setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const loggedInUser = await login();
      if (setUser) {
        setUser(loggedInUser);
      } else {
        console.error("Error: setUser no está definido en useAuth.");
      }
      console.log("Usuario autenticado:", loggedInUser);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("El usuario canceló el inicio de sesión.");
      } else {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      if (setUser) {
        setUser(null);
      } else {
        console.error("Error: setUser no está definido en useAuth.");
      }
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center login-container" style={{ minHeight: "100vh" }}>
        <div className="login-box text-center p-4 shadow rounded">
          <h1 className="mb-4">Iniciar Sesión</h1>
          {user ? (
            <div>
              <figure className="mb-3">
                <img
                  className="rounded-circle"
                  src={user.photoURL}
                  alt="Avatar"
                  width="128"
                  height="128"
                />
              </figure>
              <p className="mb-3">Bienvenido, {user.displayName}</p>
              <button className="btn btn-danger btn-block mb-3" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-block mb-3" onClick={handleLogin}>
              <i className="fab fa-google me-2"></i>
              Iniciar sesión con Google
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export { Login };
