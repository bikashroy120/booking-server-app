const express = require("express");
const { creactRoom, updateRoom, getAllRooms, deleteRoom } = require("../controllor/room");
const { authMiddleware } = require("../middlewarer/authMiddlewarer");

const router = express.Router();


router.post("/:placeId",authMiddleware,creactRoom)
router.get("/",authMiddleware,getAllRooms)
router.patch("/update/:roomId",authMiddleware,updateRoom)
router.delete("/delete/:id",authMiddleware,deleteRoom)


module.exports = router;