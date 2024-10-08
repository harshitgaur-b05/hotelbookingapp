import mongoose from "mongoose";

const hotelSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    distance:{
        type:String,
        required:true,
    },
    photos:{
        type:[String]
        
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    rooms:{
        type:[String],
        
    },
    featured:{
        type:String,
        default:false,
    },
    cheapestprice:{
        type:Number,
        required:true,
    }
})
export default mongoose.model('hotel',hotelSchema);