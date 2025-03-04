
import { auth, googleProvider } from "./firebase";



import { 
  signInWithPopup, 
  signInWithRedirect, 
  signOut, 
  getRedirectResult 
} from "firebase/auth";


export const login = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("✅ Usuario autenticado:", result.user);
    return result.user; 
  } catch (error) {
    switch (error.code) {
      case "auth/popup-closed-by-user":
        alert("⚠️ Cerraste la ventana antes de iniciar sesión. Inténtalo de nuevo.");
        console.warn("⚠️ El usuario cerró la ventana emergente.");
        break;
      case "auth/cancelled-popup-request":
        alert("⚠️ Se canceló el intento de inicio de sesión.");
        break;
      case "auth/network-request-failed":
        alert("🚨 Error de red. Verifica tu conexión.");
        break;
      case "auth/unauthorized-domain":
        alert("🚨 Dominio no autorizado. Verifica los dominios en Firebase.");
        break;
      default:
        alert("🚨 Error al iniciar sesión: " + error.message);
        console.error("🚨 Error al iniciar sesión:", error.message);
    }


    console.log("ℹ️ Probando con redirección...");
    await signInWithRedirect(auth, googleProvider);
    return null;
  }
};


export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("✅ Usuario autenticado por redirección:", result.user);
      return result.user;
    }
  } catch (error) {
    console.error("🚨 Error al procesar la redirección:", error.message);
  }
  return null;
};


export const logout = async () => {
  try {
    await signOut(auth);
    alert("✅ Sesión cerrada correctamente.");
    console.log("✅ Sesión cerrada correctamente.");
  } catch (error) {
    alert("🚨 Error al cerrar sesión: " + error.message);
    console.error("🚨 Error al cerrar sesión:", error.message);
    throw error;
  }
};
