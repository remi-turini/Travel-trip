const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const usersRoute = require("./routes/user");
const loginRoute = require("./routes/login");

app.use(bodyParser.json());

app.use("/user", usersRoute);
app.use("/login", loginRoute);

module.exports = app;