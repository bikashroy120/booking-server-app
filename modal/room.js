const mongoose = require("mongoose");



const roomSchema = new mongoose.Schema({
    place:{
        type:mongoose.Schema.ObjectId,
        ref:'Place',
        required:[true,"Review moust be a Place"]
    },
    title:{
        type:String,
        required:[true,"title cant not be empty"]
    },
    maxgest:{
        type:Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    roomNumber:{
        type:Number,
    },
    image:{
        type:String
    },
    bookDates:{
        type:Date
    }
}
)

roomSchema.index({ roomNumber: 1}, { unique: true });


const Room = mongoose.model("Room",roomSchema)

module.exports = Room