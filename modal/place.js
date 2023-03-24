const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    address:String,
    ratingsAverage: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    city:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    price:Number,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    rooms:[mongoose.Schema.ObjectId]
},{
  timestamps:true
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})


// Virtual populate
placeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

placeSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'owner',
    select: '-password -refreshToken'
  });

  next();
});

const PlaceModel = mongoose.model("Place",placeSchema);

module.exports = PlaceModel