const Place = require("../modal/place");
const asyncHandler = require("express-async-handler")


const creactPlace = asyncHandler(async(req,res,next)=>{
     const {
        title,address,addedPhotos,description,price,
        perks,extraInfo,checkIn,checkOut,maxGuests,city
      } = req.body;
     try {

        const placeDoc = await Place.create({
            owner:req.user.id,price,
            title,address,photos:addedPhotos,description,
            perks,extraInfo,checkIn,checkOut,maxGuests,
          });

          res.json(placeDoc)
        
     } catch (error) {
        res.status(500).json("shimthing is wrong")
     }
})



module.exports={creactPlace}