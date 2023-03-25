const Place = require("../modal/place");
const Room = require("../modal/room")
const catchAsync = require("../utilis/catchAsync")



const creactRoom = catchAsync(async(req,res,next)=>{

    const {placeId} = req.params;

    const creact = await Room.create({
        place:placeId,
        ...req.body
    })

    try {

        await Place.findByIdAndUpdate(placeId, {
            $push: { rooms: creact._id },
          });
        
    } catch (error) {
        throw new Error(error)
    }


    res.status(201).json({
        status: 'success',
        data:creact
      });
})

const updateRoom = catchAsync(async(req,res,next)=>{

    const {roomId} = req.params;

    const update = await Room.findByIdAndUpdate(roomId,req.body,{
        new:true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data:update
      });
})


const getAllRooms = catchAsync(async(req,res,next)=>{
    const rooms = await Room.find()

    res.status(200).json({
        status: 'success',
        data:rooms
      });
})


const deleteRoom = catchAsync(async(req,res,next)=>{
    const {id} = req.params;

    const dele = await Room.findByIdAndDelete(id);

    try {

        await Place.findByIdAndUpdate(dele.place, {
            $pull: { rooms: dele._id },
          });
        
    } catch (error) {
        throw new Error(error)
    }
    res.status(200).json({
        status: 'success',
        message:"Room delete succrssFully"
      });

})


module.exports = {creactRoom,updateRoom,deleteRoom,getAllRooms}