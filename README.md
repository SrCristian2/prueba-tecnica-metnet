# Prueba Técnica - Instrucciones de Ejecución y Decisiones Técnicas

Este repositorio contiene tanto el **backend** (API + base de datos) como el **frontend** (aplicación Vue). A continuación se describen los pasos para levantar ambos proyectos usando Docker y Docker Compose, así como una breve explicación de las principales decisiones técnicas.

---

## Requisitos

- Docker y Docker Compose instalados en tu máquina.

---

## Instrucciones para correr el proyecto

### 1. Clona el repositorio

```sh
git clone https://github.com/SrCristian2/prueba-tecnica-metnet.git
```

---

### 2. Backend

1. Entra a la carpeta del backend:

   ```sh
   cd backend
   ```

2. Copia el archivo de entorno si es necesario:
   ```sh
   cp .env.example .env
   ```
   Ajusta las variables según tu entorno.

---

### 3. Frontend

1. Entra a la carpeta del frontend:
   ```sh
   cd ../frontvue
   ```

---

### 4. Levanta los servicios con Docker Compose

Desde la **raíz del proyecto** (donde está `docker-compose.yml`):

```sh
docker-compose up --build
```

Esto construirá y levantará tanto el backend (API + MongoDB) como el frontend (Vue).

---

### 5. Acceso a la aplicación

- **Backend API:** [http://localhost:4000](http://localhost:4000)
- **MongoDB:** puerto `27017`
- **Frontend:** [http://localhost:5173](http://localhost:5173)

---

### 6. Correr tests en el backend (opcional)

Si quieres correr los tests manualmente:

```sh
docker-compose exec backend npm test
```

---

## Breve explicación de decisiones técnicas

### Backend

- **Node.js + Express:** Framework robusto y ampliamente usado para construir APIs RESTful.
- **TypeScript:** Mejora la mantenibilidad y escalabilidad del código gracias al tipado estático.
- **MongoDB:** Base de datos NoSQL flexible, ideal para prototipos y aplicaciones con esquemas dinámicos.
- **Arquitectura modular:** Separación clara entre controladores, servicios, repositorios y middlewares para facilitar el testing y la escalabilidad.
- **Testing con Jest y Supertest:** Permite pruebas unitarias y de integración de rutas de forma sencilla y rápida.
- **Docker y Compose:** Facilita la ejecución y despliegue del proyecto, asegurando que todos los servicios (API y base de datos) estén correctamente orquestados y listos antes de iniciar el backend.
- **Healthcheck en MongoDB:** El backend espera a que la base de datos esté lista antes de arrancar, evitando errores de conexión en el arranque.

### Frontend

- **Docker:** Se utilizó Docker y Docker Compose para facilitar la ejecución y asegurar la portabilidad del entorno de desarrollo.
- **Node 20:** Se eligió una imagen oficial de Node.js para garantizar compatibilidad y soporte.
- **Vite:** El proyecto usa Vite como herramienta de desarrollo para Vue, lo que permite recarga rápida y una configuración sencilla.
- **Montaje de volumen:** Se monta el código fuente como volumen para permitir hot reload durante el desarrollo.
- **Exposición de puertos:** Se expone el puerto 5173, que es el puerto por defecto de Vite, para acceder a la app desde el navegador.

---
