# 🎵 MyBeatFi

**MyBeatFi** es una aplicación web donde los usuarios pueden explorar canciones, ver detalles, crear playlists personalizadas y gestionar su biblioteca musical de manera sencilla. La plataforma ofrece una experiencia responsiva, moderna y fluida utilizando tecnologías web actuales como Angular y Firebase.

---

## 🚀 Tecnologías usadas

- Angular 
- AngularFire
- Firebase Authentication
- Firebase Firestore
- Tailwind CSS 
- TypeScript
- Git y GitHub
- Cloudinary – Servicio de almacenamiento y entrega de imágenes

---

## 📦 Instalación del proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/fiorelath/mybeatfi.git

##  Arquitectura del proyecto 

MyBeatFy está organizado bajo una arquitectura modular siguiendo buenas prácticas de Angular, con separación clara entre componentes, servicios, modelos, rutas y estilos.

###  Componentes principales

- **InicioComponent**: Página de bienvenida.
- **CancionesComponent**: Muestra la lista de canciones.
- **AgregarCancionComponent**: Formulario para crear y editar canciones usando formularios reactivos.
- **PlaylistsComponent**: Gestión de playlists del usuario.
- **LoginComponent / RegisterComponent**: Manejo de autenticación.
- **NavbarComponent**: Barra de navegación entre vistas.

###  Servicios

- **AuthService**: Manejo de registro, login y logout mediante Firebase Authentication.
- **CancionesService**: Realiza operaciones CRUD sobre las canciones almacenadas en Firestore.
- **PlaylistsService**: CRUD de playlists y relación con canciones.

###  Otros elementos clave

- **Guards**: Protección de rutas para restringir acceso solo a usuarios autenticados.
- **Pipes personalizados**: Mejora visual de datos como duración de la canción o filtros por género.

## 🌐 URL de Firebase Hosting

Puedes ver la aplicación desplegada aquí:  
🔗 [https://mybeatfi-2b572.web.app](https://mybeatfi-2b572.web.app)

---

## 🎥 Video demostrativo (5 a 8 minutos)

Puedes ver una demostración completa de la aplicación en funcionamiento aquí:  
📹 [https://youtu.be/jFsUYsKcFc4](https://youtu.be/jFsUYsKcFc4)
