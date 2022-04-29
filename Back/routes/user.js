const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller")

router.post("/", userController.createUser);
// router.get("/", userController.getUser);
router.get("/", userController.getAllUser);
// router.put("/", userController.updateUser);

module.exports = router;