const Place = require("../modal/place");
const asyncHandler = require("express-async-handler")
const catchAsync = require("../utilis/catchAsync")


const creactPlace = asyncHandler(async(req,res,next)=>{
     const {
        title,address,addedPhotos,description,price,
        perks,extraInfo,checkIn,checkOut,maxGuests,city
      } = req.body;
     try {

        const placeDoc = await Place.create({
            owner:req.user.id,
            ...req.body
          });

          res.json(placeDoc)
        
     } catch (error) {
        res.status(500).json("shimthing is wrong")
     }
})


const getAllPlece = asyncHandler(async(req,res)=>{

   try {

      // Filtring
      const queryObj = {...req.query}
      const excludedFields = ['page','sort','limit','fields']
      excludedFields.forEach(el=>delete queryObj[el])
      console.log(req.query,queryObj)


      // Advance Filtring

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,macth=>`$${macth}`)

      let query = Place.find(JSON.parse(queryStr));

      //shorting
      if(req.query.sort){
         const sortBy = req.query.sort.split(",").join(" ")
         query = query.sort(sortBy)
      }
      // else{
      //    query = query.sort('-')
      // }


      // Filed Leamiting

      if(req.query.fields){
         const fieldsBy = req.query.fields.split(",").join(" ")
         query = query.select(fieldsBy)
      }else{
         query = query.select('-__v')
      }

      // Pagenation

      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit)

      if(req.query.page){
         const numPlace = await Place.countDocuments();
         if(skip >= numPlace){
            res.status(300).json("no page")
         }
      }

      const place = await query;
      res.json({
         status:"Success",
         result:place.length,
         data:place
      })
   } catch (error) {
      res.status(400).json(error)
   }
})


const updatePlace = catchAsync(async(req,res,next)=>{

   const tour = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!tour) {
     return res.status(400).json({mes:"somthing is wrong! please try later"});
    }
  
    res.status(200).json({
      status: 'success',
      data:tour
    });

})


const getWonerPlace = asyncHandler(async(req,res)=>{

   const {id} = req.user;

   try {
      const place = await Place.find({owner:id});
      res.json(place)
      
   } catch (error) {
      res.json(error)
   }
})

const deletePlace = catchAsync(async(req,res,next)=>{

   const {id} = req.body;

   const deletedata = await Place.findByIdAndDelete(id)

   res.states(204).json({
      status:"succes",
      message:"Plase delete successfully!"
   })
   
})


const getAvrgase = asyncHandler(async(req,res)=>{
   try {
      
      const states =await Place.aggregate([
         // {
         //    $match:{ maxGuests: { $gte: 5}}
         // },

         { $group: { _id: null, 
            total: { $sum: "$maxGuests" },
            minNumber:{$min:"$maxGuests"}
          } },

      ])

      res.json({
         status:"Success",
         result:states.length,
         data:states
      })

   } catch (error) {
      res.json(error)
   }
})


const getMon = asyncHandler(async(req,res)=>{
   try {
      
      const states =await Place.aggregate([
         { $group: { _id: null, 
            total: { $sum: "$maxGuests" },
            minNumber:{$min:"$maxGuests"}
          } },
      ])

      res.json({
         status:"Success",
         result:states.length,
         data:states
      })

   } catch (error) {
      res.json(error)
   }
})



module.exports={creactPlace,getAllPlece,getWonerPlace,updatePlace,deletePlace,getAvrgase,getMon}