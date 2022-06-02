const express = require("express");
const router = express.Router();

const travelController = require("../controllers/travel.controller")
const auth = require('../middleware/auth.middleware');

router.get("/all", auth, travelController.getTravels);
router.get("/one", auth, travelController.getTravelById);
router.post("/", auth, travelController.createTravel);
router.post("/share", auth, travelController.shareTravel);
router.get("/test", travelController.test);

module.exports = router;