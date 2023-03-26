const express = require("express");
const { creactPlace, getAllPlece, getWonerPlace, getAvrgase, getMon, updatePlace, deletePlace, getSingalPlace } = require("../controllor/place");
const { authMiddleware,isOwner } = require("../middlewarer/authMiddlewarer");

const router = express.Router();

router.post("/",authMiddleware,isOwner,creactPlace)
router.get("/",getAllPlece)
router.get("/:id",getSingalPlace)
router.get("/owner",authMiddleware,isOwner,getWonerPlace)
router.patch("/update/:id",authMiddleware,isOwner,updatePlace)
router.delete("/delete/id",authMiddleware,isOwner,deletePlace)
router.get("/avg",getAvrgase)
router.get("/mon",getMon)



module.exports = router;