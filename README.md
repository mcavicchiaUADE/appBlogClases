# MiniBlog de Clases

Aplicación móvil desarrollada con React Native y Expo que permite crear y visualizar publicaciones en un blog. Incluye persistencia local de datos y gestión de estado con Redux Toolkit.

## 🚀 Tecnologías Utilizadas

### Core
- **React Native** (v0.81.5) - Framework para desarrollo móvil multiplataforma
- **React** (v19.1.0) - Biblioteca para construir interfaces de usuario
- **Expo** (v54.0.25) - Plataforma y herramientas para desarrollo React Native

### Gestión de Estado
- **Redux Toolkit** (v2.11.0) - Herramientas oficiales para Redux
- **React Redux** (v9.2.0) - Bindings de React para Redux

### Persistencia de Datos
- **@react-native-async-storage/async-storage** (v2.1.0) - Almacenamiento local asíncrono

### API Externa
- **JSONPlaceholder** - API REST de prueba para obtener y crear publicaciones

### Instalación de Expo CLI (opcional)

npm install -g expo-cliO puedes usar `npx expo` sin instalarlo globalmente.

## 📦 Instalación

1. Clona el repositorio:
git clone https://github.com/mcavicchiaUADE/appBlogClases.git

2. Instala en la raiz del proyecto
npm install


### Iniciar el servidor de desarrollo

npm start

O directamente con Expo:

npx expo start

**Android:**
npm run android
# o
npx expo start --android

**iOS:**
npm run ios
# o
npx expo start --ios

**Web:**
npm run web
# o
npx expo start --web

1. Ejecuta `npm start`
2. Escanea el código QR con:
   - **iOS**: Cámara nativa o app Expo Go
   - **Android**: App Expo Go

## 📁 Estructura del Proyecto

```
miniBlog-clases/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/         # Componentes comunes (Loading, Error, Success)
│   │   └── posts/          # Componentes relacionados con posts
│   ├── constants/          # Constantes y configuración
│   │   ├── api.js         # Endpoints y configuración de API
│   │   └── validation.js  # Reglas y mensajes de validación
│   ├── features/          # Features de Redux (slices)
│   │   └── posts/         # Slice y selectores de posts
│   ├── hooks/             # Custom hooks
│   │   └── usePostForm.js # Hook para gestión del formulario
│   ├── middleware/        # Middleware de Redux
│   │   └── persistenceMiddleware.js # Persistencia automática
│   ├── screens/           # Pantallas de la aplicación
│   │   └── HomeScreen.js  # Pantalla principal
│   ├── services/          # Servicios de API
│   │   └── api.js         # Llamadas a la API
│   ├── store/             # Configuración de Redux
│   │   └── store.js       # Store principal
│   └── utils/             # Utilidades
│       ├── storage.js     # Funciones de AsyncStorage
│       └── validators.js  # Funciones de validación
├── App.js                 # Componente raíz
├── index.js               # Punto de entrada
├── app.json               # Configuración de Expo
└── package.json           # Dependencias del proyecto
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS
- `npm run web` - Ejecuta la app en el navegador


## 🏗️ Arquitectura

El proyecto sigue una arquitectura basada en features con separación de responsabilidades:

- **Redux Toolkit**: Gestión de estado global
- **Custom Hooks**: Lógica reutilizable
- **Services**: Abstracción de llamadas API
- **Components**: Componentes presentacionales y contenedores
- **Middleware**: Persistencia automática de datos

## 📝 Notas Adicionales

- Los datos se persisten localmente usando AsyncStorage
- La API utilizada es JSONPlaceholder (solo para pruebas)
- El formulario incluye validación en tiempo real con debounce
- Los nuevos posts aparecen al inicio de la lista

## 👤 Autor

Desarrollado como trabajo práctico individual para UADE por Marcos Cavicchia.

## 🤖 Uso de IA

Se uso IA para realizar la documentacion completa de la app. Y se uso IA para generar .gitignore decente.
Tambien se uso IA para la implementacion del AsyncStorage ya que fue un extra que decidi agregar.