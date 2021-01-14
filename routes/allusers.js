const express = require("express");
const router = express.Router();
const { usersList } = require("../controllers/userController");

router.get("/", usersList);

module.exports = router;
