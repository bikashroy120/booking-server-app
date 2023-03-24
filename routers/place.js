const express = require("express");
const { creactPlace, getAllPlece, getWonerPlace, getAvrgase, getMon, updatePlace, deletePlace } = require("../controllor/place");
const { authMiddleware } = require("../middlewarer/authMiddlewarer");

const router = express.Router();

router.post("/",authMiddleware,creactPlace)
router.get("/",getAllPlece)
router.get("/owner",authMiddleware,getWonerPlace)
router.patch("/update/:id",authMiddleware,updatePlace)
router.delete("/delete/id",authMiddleware,deletePlace)
router.get("/avg",getAvrgase)
router.get("/mon",getMon)



module.exports = router;