NOC-App es una aplicación de monitoreo de servicios (Network Operations Center) desarrollada con Node.js y TypeScript. Esta herramienta verifica periódicamente el estado de servicios web, registra eventos y envía notificaciones cuando se detectan problemas.

## Características

- **Monitoreo de servicios**: Verifica el estado de URLs configuradas en intervalos regulares
- **Sistema de logs multinivel**: Registra eventos con diferentes niveles de severidad (bajo, medio, alto)
- **Almacenamiento flexible**: Guarda logs en sistema de archivos, MongoDB y PostgreSQL
- **Notificaciones por email**: Envía alertas por correo electrónico cuando se detectan problemas
- **Tareas programadas**: Utiliza CRON para ejecutar verificaciones periódicas

## Arquitectura

El proyecto sigue una arquitectura limpia (Clean Architecture) con:

- **Dominio**: Entidades, casos de uso y repositorios abstractos
- **Infraestructura**: Implementaciones concretas de repositorios y fuentes de datos
- **Presentación**: Servicios de correo electrónico, CRON y servidor

## Tecnologías utilizadas

- **TypeScript**: Lenguaje de programación principal
- **Node.js**: Entorno de ejecución
- **MongoDB**: Base de datos NoSQL para almacenamiento de logs
- **PostgreSQL**: Base de datos SQL para almacenamiento de logs
- **Prisma**: ORM para interactuar con PostgreSQL
- **Mongoose**: ODM para interactuar con MongoDB
- **Docker**: Contenedorización de bases de datos
- **Nodemailer**: Servicio de envío de correos electrónicos
- **Cron**: Programación de tareas

## Requisitos

- Node.js 16.x o superior
- Docker y Docker Compose (para contenedores de bases de datos)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/andreudev/noc-app.git
   cd noc-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo .env basado en las variables requeridas:

   ```
   PORT=3000
   MAILER_EMAIL=tu-email@gmail.com
   MAILER_SECRET_KEY=tu-contraseña-de-app
   MAILER_SERVICE=gmail
   PROD=false

   # MongoDB
   MONGO_URL=mongodb://user:password@localhost:27017
   MONGO_DB_NAME=NOC
   MONGO_USER=mongodb
   MONGO_PASSWORD=123456

   # PostgreSQL
   POSTGRES_URL=postgresql://postgres:123456@localhost:5432/NOC
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=123456
   POSTGRES_DB=NOC
   ```

4. Inicia los contenedores de bases de datos:

   ```bash
   docker-compose up -d
   ```

5. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

## Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

## Estructura del proyecto

```
├── logs/                      # Directorio de logs del sistema de archivos
├── prisma/                    # Esquema y migraciones de Prisma
├── src/
│   ├── config/                # Configuraciones
│   │   └── plugins/           # Plugins de configuración
│   ├── data/                  # Capa de datos
│   │   └── mongo/             # Configuración y modelos de MongoDB
│   ├── domain/                # Dominio de la aplicación
│   │   ├── datasources/       # Interfaces de fuentes de datos
│   │   ├── entities/          # Entidades de dominio
│   │   ├── repository/        # Interfaces de repositorios
│   │   └── use-cases/         # Casos de uso
│   ├── infrastructure/        # Implementaciones de infraestructura
│   │   ├── datasources/       # Implementación de fuentes de datos
│   │   └── repositories/      # Implementación de repositorios
│   └── presentation/          # Capa de presentación
│       ├── cron/              # Servicios de tareas programadas
│       ├── email/             # Servicio de correo electrónico
│       └── server.ts          # Punto de entrada del servidor
└── app.ts                     # Punto de entrada de la aplicación
```

## Contribución

Si deseas contribuir a este proyecto, por favor:

1. Haz fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some amazing feature'`)
4. Sube tus cambios (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
