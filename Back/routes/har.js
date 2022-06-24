const express = require("express");
const router = express.Router();

const harController = require("../controllers/har.controller")
const auth = require('../middleware/auth.middleware');

router.post("/", auth, harController.allByCity);

module.exports = router;