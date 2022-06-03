const express = require("express");
const router = express.Router();

const transportController = require("../controllers/transport.controller")
const auth = require('../middleware/auth.middleware');

router.get("/", transportController.getAirplanesByIata);

module.exports = router;