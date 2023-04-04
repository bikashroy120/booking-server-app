const express = require("express");
const { creactRoom, updateRoom, getAllRooms, deleteRoom, getSingalRoom } = require("../controllor/room");
const { authMiddleware,isOwner } = require("../middlewarer/authMiddlewarer");

const router = express.Router();


router.post("/:placeId",authMiddleware,isOwner,creactRoom)  
router.get("/",authMiddleware,isOwner,getAllRooms)
router.get("/:id",getSingalRoom)
router.patch("/update/:roomId",authMiddleware,isOwner,updateRoom)
router.delete("/delete/:id",authMiddleware,isOwner,deleteRoom)


module.exports = router;