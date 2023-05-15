const express = require("express");
const router = express.Router();
const gptRoutes = require("../controllers/user");
const protectRoutes = require("../helper/protectRoutes");

router.route("/gpt").post(gptRoutes.createGpt);
router.route("/gpts").post(gptRoutes.getMessage);
router.route("/message").post(gptRoutes.createMessage);
router.route("/extra").post(gptRoutes.createExtra);
router.route("/conversation").post(gptRoutes.createConversation);
router.route("/getconver").post(gptRoutes.getConversation);
router.route("/deletemessage").post(gptRoutes.deleteMessages);

module.exports = router;
