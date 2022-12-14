const express = require("express");
const router = express.Router();

const travelController = require("../controllers/travel.controller")
const auth = require('../middleware/auth.middleware');

router.get("/all", auth, travelController.getTravels);
router.post("/one", auth, travelController.getTravelByName);
router.post("/", auth, travelController.createTravel);
router.post("/share", auth, travelController.shareTravel);
router.get("/test", travelController.test);

module.exports = router;