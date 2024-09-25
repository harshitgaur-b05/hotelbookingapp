import Hotel from "../Modules/Hotel.js";
import Room from "../Modules/Room.js";
export const adddata=async (req, res) => {

    try {
        const hotel= await new Hotel(req.body);
        console.log(hotel)
       const savedhotel=await hotel.save()
       res.status(200).json(savedhotel);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error creating hotel",
            error: err.message
        });
    }
}

export const updatedata=async (req, res) => {


    try {
        const updateHotel= await Hotel.findByIdAndUpdate(req.params.id,{ $set : req.body},{new:true});
       
       res.status(200).json(updateHotel);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error creating hotel",
            error: err.message
        });
    }
}

export const deletedata=async (req, res) => {


    try {
             await Hotel.findByIdAndDelete(req.params.id,{ $set : req.body},{new:true});
       
       res.status(200).send("deteled  hotel");
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error deleting hotel",
            error: err.message
        });
    }
}

export const read_one_data=async (req, res) => {


    try {
        const hotel= await Hotel.findById(req.params.id);
       
       res.status(200).json(hotel);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting hotel",
            error: err.message
        });
    }
}


  export const read_all_data = async (req, res) => {
    const { min, max,limit, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestprice: { $gt: min | 1, $lt: max || 999 },
      }).limit(Number(limit));
      res.status(200).json(hotels);
    } catch (err) {
        res.status(400).json({
          msg: "Error getting hotels",
          error: err.message,
        });
      }
  };
  
  
export const countBycity=async (req, res) => {

    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
       res.status(200).json(list);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting hotel",
            error: err.message
        });
    }
}
export const countByType=async (req, res) => {


    try {
         const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
            { type: "apartment", count: apartmentCount }
          ]);
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting hotel",
            error: err.message
        });
    }
}

export const getHotelRooms = async (req, res, next) => {
    
    
      const hotel = await Hotel.findById(req.params.id);
      console.log(hotel)
      const list = await Promise.all(
        hotel.rooms.map((room) => {
            
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    
  };