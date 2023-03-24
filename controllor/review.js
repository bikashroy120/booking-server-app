const Review = require("../modal/review")
const Place = require("../modal/place");
const catchAsync = require("../utilis/catchAsync")



const creactReview  = catchAsync(async(req,res,next)=>{
    const {id} = req.user
    const {tourId} = req.params;

    const review = await Review.create({
        user:id,
        rating:req.body.rating,
        tour:tourId,
        review:req.body.review
    })


    const stats = await Review.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  console.log(stats);

  if (stats.length > 0) {
    await Place.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Place.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }



    res.status(201).json({
        status: 'success',
        data:review
      });

})

const getAllReview = catchAsync(async(req,res,next)=>{

    const review = await Review.find()

    res.status(201).json({
        status: 'success',
        data:review
      });


})


const deleteReview = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const delet = await Review.findByIdAndDelete(id)

    res.status(204).json({
        status:"succes",
        message:"Review Delete succesfully!"
    })
})





module.exports = {
    creactReview,
    getAllReview,
    deleteReview
}