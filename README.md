# Node Express Boilerplate

A boilerplate for node.js + express.js with Controller Service and Repository pattle.
This bolierplate is using [Sequelize](https://sequelize.org/) for Object-relational mapping.

## Table of Contents

1. [Container](#container)
2. [Run Server](#run-server)
3. [Database Migration](#database-migration)
4. [Database Seeding](#database-seeding)
5. [Download Example](#download-example)

### Container

To get started with the available container, run the following command:

```bash
docker-compose up
```

This command will start all the services defined in your docker-compose.yml file.

### Run Server

Before running the server, make sure you have Node.js and npm installed on your machine. After cloning the repository, navigate to the project directory and install the necessary packages using npm:

```bash
npm install

```

Once the packages are installed, you can start the server by running:

```bash
npm run serve

```

### Database Migration

Database migration is the process of transforming data from one format to another. In this project, we use Sequelize CLI for database migration. To migrate the database, use the following command:

```bash
npx sequelize-cli db:migrate
```

### Database Seeding

Database seeding is the initial seeding of a database with data. This data can be dummy data used for testing or initial data required for the application to run. To seed the database, use the following command:

```bash
npx sequelize-cli db:seed:all
```

After seeding you will get ramdom users with email and password is "test" which can use to be credentials to login.

### Download Example

[Postman](https://github.com/pitchayakit/node-express-boilerplate/blob/master/postman/Bolerplate.postman_collection.json)

Please replace the placeholders with the actual content relevant to your project.
