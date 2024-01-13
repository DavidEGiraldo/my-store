# My-Store

My-Store es una RESTful API para gestionar productos, categorías, órdenes, usuarios y clientes de una E-commerce. Desarrollada con Express.js, Sequelize y PostgreSQL, esta herramienta te permite realizar todas las operaciones CRUD de una manera sencilla.

## Características principales

- Operaciones CRUD para productos, categorias, órdenes, usuarios y clientes.
- Middleware de manejo de errores con Boom.
- Middleware de validación de datos con Joi.
- Generación de datos de prueba con Faker.
- Servicios para persistencia de datos en PostgreSQL a través de Sequelize.
- Base de datos y cliente gráfico preconfigurados en contenedores de Docker.
- Despliegue en línea: Visita la [demostración](https://my-store-hmxh.onrender.com) en Render.

## Contribuciones

Las contribuciones son bienvenidas y apreciadas. Si encuentras errores, tienes ideas para nuevas características o mejoras, por favor, abre un "Issue" o envía un "Pull Request". 

## Enlaces útiles

- [Documentación de Node](https://nodejs.org/docs/latest/api/)
- [Documentación de Express](https://expressjs.com/es/)
- [Documentación de Sequelize](https://sequelize.org/docs/v6/)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Documentación de pgAdmin](https://www.pgadmin.org/docs/)
- [Documentación de Docker](https://docs.docker.com/)
- [Documentación de Boom](https://hapi.dev/module/boom/)
- [Documentación de Joi](https://joi.dev/api/?v=17.9.1)
- [Documentación de Faker](https://fakerjs.dev/guide/)
  
## Créditos

Este proyecto fue desarrollado por [David Giraldo](https://github.com/DavidEGiraldo).

## Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de utilizar el código en tus propios proyectos y modificarlo según tus necesidades.

------------------

To run the project locally follow the next steps:

## Run Locally

Clone the project

```bash
git clone git@github.com:DavidEGiraldo/my-store.git
```

Go to project directory

```bash
cd my-store
```

Install dependencies

```bash
npm install
```

Start PostgreSQL and pgAdmin containers

```bash
docker-compose up -d
```

Setup the database (run migrations and seeds)

```bash
npm run migrate:run && npm run seed:run
```

>**Note:** Before you run the server locally, make sure you've already setted up your environment variables on the `.env` file

Start the dev server

```bash
npm run dev
```

Start the server

```bash
npm run start
```


## API Reference

Base URL: `http://localhost:3000/api/v1`

To more info see the [swagger docs](https://github.com/DavidEGiraldo/my-store)

| End points    | Description               |
| :-------------| :-------------------------|
| `/users`      | Acces to users schema     |
| `/products`   | Acces to products schema  |
| `/categories` | Acces to categories schema|
| `/customers`  | Acces to customers schema |
| `/orders`     | Acces to orders schema    |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

You have a template in `.env.example` file

```
PORT=
DB_URL=''

PG_EMAIL=''
PG_PASSWORD=''
PG_PORT=''
PG_REFPORT=''
```
