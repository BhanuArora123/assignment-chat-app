const express = require("express");

const userController = require("../controllers/users");

const router = express.Router();

router.get("/",userController.getHome);
router.get("/users",userController.getUser);
router.post("/create-user",userController.createUser)

module.exports = router;