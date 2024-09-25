import express from "express";
import mongoose from "mongoose";
import Hotel  from "../Modules/Hotel.js";// Ensure this matches the actual file name
import { adddata, countBycity, countByType, deletedata, read_all_data, read_one_data, updatedata,getHotelRooms } from "../controllers/hotel.js";
import { verifyadmin } from "../utils/verifytokens.js";

const router = express.Router();

// Create a new hotel
router.post("/",adddata );



//update 
router.put("/:id",verifyadmin ,updatedata);
//delete 
router.delete("/find/:id/:hotelId",verifyadmin,deletedata);
// get 
router.get("/find/:id",read_one_data);
//get all
router.get("/",read_all_data);
router.get("/countBycity",countBycity);
router.get("/countByType",countByType); 
router.get("/rooms/:id",getHotelRooms); 
export default router;
//countBycity?cities=berlin,madrid,london
