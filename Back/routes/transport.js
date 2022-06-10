const express = require("express");
const router = express.Router();

const transportController = require("../controllers/transport.controller")
const auth = require('../middleware/auth.middleware');

router.post("/", transportController.setAirplanesByCities);

module.exports = router;