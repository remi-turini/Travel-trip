const express = require("express");
const router = express.Router();

const destinationController = require("../controllers/destination.controller")
const auth = require('../middleware/auth.middleware');

router.post("/", auth, destinationController.addDestination);

module.exports = router;