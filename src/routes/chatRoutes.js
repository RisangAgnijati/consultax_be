const express = require("express");
const chatController = require("../controllers/chatController");
const grantsChatController = require("../controllers/grantsChatController");
const inheritancesChatController = require("../controllers/inheritancesChatController");
const pphChatController = require("../controllers/pphChatController");

const router = express.Router();

// POST /api/chat
router.post("/chat", chatController);
router.post("/grantschat", grantsChatController);
router.post("/inheritanceschat", inheritancesChatController);
router.post("/pphchat", pphChatController);

module.exports = router;
