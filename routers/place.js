const express = require("express");
const { creactPlace } = require("../controllor/place");
const { authMiddleware } = require("../middlewarer/authMiddlewarer");

const router = express.Router();

router.post("/",authMiddleware,creactPlace)


module.exports = router;