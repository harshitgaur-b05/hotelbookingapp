import mongoose from "mongoose";

const RoomSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
        unique:true,
    },
    desc:{
        type:String,
        required:true,
    },
    rooms:{
        type:[String]
    }
    ,
    cheapestprice:{
                type:Number,
            required :true,
    },
    featured:{
        type:Boolean,
        required :true,
        },

    maxpeople:{
        type:Number,
        required:true
    }
   ,
  roomNumbers:[{number:Number,unavailable:[{type:Date}]}]
},{timestamps:true})
export default mongoose.model('Room',RoomSchema);