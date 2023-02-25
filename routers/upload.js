const express = require("express");
const { uploadLinkImg } = require("../controllor/upload");

const router = express.Router();


router.post("/link-upload", uploadLinkImg)




module.exports = router;