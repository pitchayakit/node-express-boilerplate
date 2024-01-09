# Node Express Boilerplate
A boilterplate for node.js + express.js with all necessary module

## Usage

### Container 
Get start with available container

```bash
docker-compose up 
```

### Run Server

We already inject all dependencies in 'index.js', So you can start the server immediately (npm install required)

``` bash
# start the server
npm run serve

```

### Migration
```bash
npx sequelize-cli db:migrate
```

### Seeder
```bash
npx sequelize-cli db:seed:all
```