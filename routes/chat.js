const express = require("express");

const chatController = require("../controllers/chat");

const userController = require("../controllers/users");

const router = express.Router();

router.get("/chat-area/:email",chatController.getChat);
router.post("/sendChat",chatController.sendChat);

module.exports = router;