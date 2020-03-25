const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

router.post("/add/users", controllers.addUsers);
router.get("/get/users", controllers.getUsers);
router.post("/get/user/chats", controllers.getUserChats);

module.exports = router;
