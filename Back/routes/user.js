const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller")
const auth = require('../middleware/auth.middleware');

router.post("/", userController.createUser);
router.get("/", auth, userController.getUser);
router.put("/", auth, userController.updateUser);
router.delete("/", auth, userController.deleteUser);

module.exports = router;