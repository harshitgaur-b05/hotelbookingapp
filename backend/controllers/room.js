import Room from "../Modules/Room.js";
import Hotel from "../Modules/Hotel.js"
export const createROOM=async (req,res,next)=>{
    const hotelId=req.params.hotelId
    const newroom=new RoomJS(req.body);
    console.log(newroom);
    try {
        const saveroom=await newroom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push: {rooms:saveroom._id}})
        } catch (error) {
            res.send(error)
        }
        res.status(200).json(saveroom);
        
    } catch (error) {
        res.send(error)
    }
}


export const updateroom=async (req, res) => {


    try {
        const updateroom= await RoomJS.findByIdAndUpdate(req.params.id,{ $set : req.body},{new:true});
       
       res.status(200).json(updateroom);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error creating hotel",
            error: err.message
        });
    }
}
export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailable": req.body.dates,  // Update field name to 'unavailable'
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      res.status(400).json({
        msg: "Error updateRoomAvailability hotel",
        error: err.message,
      });
    }
  };
  
export const deleteroom=async (req, res) => {


    try {
             await RoomJS.findByIdAndDelete(req.params.id);
       
       res.status(200).send("deteled  hotel");
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error deleting hotel",
            error: err.message
        });
    }
}

export const read_one_room=async (req, res) => {


    try {
        const room= await RoomJS.findById(req.params.id);
       
       res.status(200).json(room);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting hotel",
            error: err.message
        });
    }
}
export const read_all_room=async (req, res) => {


    try {
        const room= await RoomJS.find();
       
       res.status(200).json(room);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting hotel",
            error: err.message
        });
    }
}