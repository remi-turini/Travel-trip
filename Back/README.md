## Common setup

```bash
npm install
npm install -g sequelize-cli mysql2
```

List of dependencies :
* express
* mysql2
* sequelize
* sequelize-cli
* body-parser
* bcrypt
* cors
* jsonwebtoken
* mysql
* mysql-migrations
* nodemon

## Start the server

To start the express server, run the following

```bash
nodemon
```

And run wamp server or you will say oh shit why is it not working ?! Because you're bad fuckers !

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## Database

Create

```bash
sequelize db:create
```

Migrate

```bash
sequelize db:migrate
```

## For back Developer only

Create User entity

```bash
sequelize model:generate --name User --attributes firstname:string,lastname:string,email:string,password:string
```

Create Travel entity

```bash
sequelize model:generate --name Travel --attributes startDate:date,endDate:date,price:float,peopleNumber:integer
```

Create Transport entity

```bash
sequelize model:generate --name Transport --attributes 
```

Create Eat entity

```bash
sequelize model:generate --name Eat --attributes travelId:integer,name:string,country:string,city:string,address:string,type:string
,speciality:string,rating:float,date:date,peopleNumber:integer,photo:string,price:float,order:integer,reserved:boolean
```

Create Sleep entity

```bash
sequelize model:generate --name Sleep --attributes travelId:integer,name:string,country:string,city:string,address:string,typeOfRoo
m:string,date:date,peopleNumber:integer,photo:string,price:float,order:integer,reserved:boolean
```

Create Activity entity

```bash
sequelize model:generate --name Activity --attributes travelId:integer,name:string,type:string,country:string,city:string,address:s
tring,date:date,peopleNumber:integer,photo:string,price:float,order:integer,reserved:boolean
```

## Documents

[https://developers.google.com/maps/documentation?hl=fr](route api google) find the best road for a destination by car, bike, or walk