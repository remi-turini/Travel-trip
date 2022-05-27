const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const userRoute = require("./routes/user");
const loginRoute = require("./routes/login");
const travelRoute = require("./routes/travel");

app.use(bodyParser.json(), cors());

app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/travel", travelRoute);

module.exports = app;