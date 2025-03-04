# Autenticación con Firebase

Este proyecto ejemplifica la integración de **Firebase Auth** en una aplicación, la creación de una **vista de login**, el uso de un **estado global** para manejar la sesión del usuario y la **protección de rutas**.

## Características Principales

1. **Autenticación**  
   - Se configura **Firebase Auth** para manejar el registro y el inicio de sesión (por correo y contraseña, o el método que prefieras).
   - Permite iniciar y cerrar sesión desde la UI.

2. **Vista de Login**  
   - Existe una pantalla (página o componente) para que el usuario ingrese sus credenciales y se autentique.
   - Si los datos son correctos, se inicia la sesión y el usuario es dirigido a la ruta protegida.

3. **Estado Global**  
   - Un **context** (o Redux) mantiene el estado de la sesión en toda la aplicación.
   - Cualquier componente puede conocer si el usuario está autenticado y, opcionalmente, obtener su información.

4. **Protección de Rutas**  
   - Algunas rutas requieren que el usuario esté logueado.
   - Si el usuario no tiene sesión, es redirigido a la vista de login.

## Requisitos Previos

1. Cuenta en [Firebase](https://firebase.google.com/) con **Firebase Auth** habilitado.  
2. **Node.js** y **npm** o **yarn** instalados.  
3. Proyecto inicial de React (o similar).

## Pasos de Configuración

1. **Instalar Dependencias**  
   ```bash
   npm install
