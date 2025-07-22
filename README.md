# 🎵 MyBeatFi

MyBeatFi es una aplicación web donde los usuarios pueden explorar canciones, ver detalles, crear playlists personalizadas y gestionar su biblioteca musical de manera sencilla. La plataforma ofrece una experiencia responsiva, moderna y fluida utilizando tecnologías web actuales como Angular y Firebase.

---

## 🚀 Tecnologías Usadas

* *Angular*: Framework principal del frontend  
* *AngularFire*: Integración de Angular con Firebase  
* *Firebase Authentication*: Servicio para la gestión de usuarios  
* *Firebase Firestore*: Base de datos NoSQL en la nube  
* *Tailwind CSS*: Framework CSS para estilos utilitarios  
* *TypeScript*: Lenguaje de programación  
* *Git y GitHub*: Control de versiones y alojamiento de código  
* *Cloudinary*: Servicio de almacenamiento y entrega de imágenes

---

## 📦 Instalación del Proyecto

Para poner en marcha el proyecto localmente, sigue estos pasos:

1.  *Clona el repositorio:*
    ```bash
    git clone https://github.com/fiorelath/mybeatfi.git
    cd mybeatfi
    ```

2.  *Instala las dependencias:*
    ```bash
    npm install
    ```

3.  *Configura Firebase:*
    Crea un archivo `src/environments/environment.ts` (o `src/app/firebase.ts` si tu configuración es global como en nuestros ejemplos anteriores) y añade tus credenciales de Firebase.

    ```typescript
    // Ejemplo de src/environments/environment.ts
    export const environment = {
      production: false,
      firebase: {
        apiKey: "TU_API_KEY",
        authDomain: "TU_DOMINIO.firebaseapp.com",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
      }
    };
    ```

    *(Asegúrate de que esta configuración coincida con cómo estás inicializando Firebase en tu `app.config.ts` o `firebase.ts`.)*

4.  *Inicia el servidor de desarrollo:*
    ```bash
    ng serve
    ```

    La aplicación estará disponible en `http://localhost:4200/`.

---

## 📐 Arquitectura del Proyecto

MyBeatFi está organizado bajo una arquitectura modular siguiendo buenas prácticas de Angular, con separación clara entre componentes, servicios, modelos, rutas y estilos.

### Componentes Principales

* `InicioComponent`: Página de bienvenida de la aplicación.  
* `CancionesComponent`: Muestra la lista completa de canciones disponibles.  
* `AgregarCancionComponent`: Formulario para crear y editar canciones, utilizando formularios reactivos para una gestión de datos eficiente.  
* `PlaylistsComponent`: Permite a los usuarios gestionar sus playlists personalizadas.  
* `LoginComponent / RegisterComponent`: Manejan el proceso de autenticación de usuarios.  
* `NavbarComponent`: Barra de navegación principal para moverse entre las diferentes vistas de la aplicación.

### Servicios

* `AuthService`: Encargado de la lógica de registro, inicio y cierre de sesión mediante Firebase Authentication.  
* `CancionesService`: Realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las canciones almacenadas en Firestore.  
* `PlaylistsService`: Gestiona las playlists de los usuarios y su relación con las canciones.

### Otros Elementos Clave

* *Guards*: Implementados para proteger rutas, restringiendo el acceso solo a usuarios autenticados.  
* *Pipes personalizados*: Mejoran la visualización de datos, como el formato de la duración de las canciones o el filtrado por género.

---

## 🌐 URL de Firebase Hosting

Puedes ver la aplicación desplegada en vivo aquí:

🔗 [https://mybeatfi-2b572.web.app](https://mybeatfi-2b572.web.app)

---

## 🎥 Video Demostrativo

Puedes ver una demostración completa de la aplicación en funcionamiento aquí:

📹 [https://youtu.be/jFsUYsKcFc4](https://youtu.be/jFsUYsKcFc4)

---

