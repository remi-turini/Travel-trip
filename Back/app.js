const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const usersRoute = require("./routes/user");

app.use(bodyParser.json());

app.use("/user", usersRoute);

module.exports = app;