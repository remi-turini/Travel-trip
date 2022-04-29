## Common setup

```bash
npm install
```

List of dependencies :
* express
* mysql2
* sequelize
* sequelize-cli
* body-parser

## Start the server

To start the express server, run the following

```bash
npm start
```

And run wamp server or you will say oh shit why is it not working ?! Because you're bad fuckers !

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## Database

Create entity

```bash
sequelize model:generate --name user --attributes firstname:string,lastname:string
```

Migrate

```bash
sequelize db:migrate
```

## Documents

[https://developers.google.com/maps/documentation?hl=fr](route api google) find the best road for a destination by car, bike, or walk