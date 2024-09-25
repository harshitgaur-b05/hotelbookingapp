import express from "express";
import { createROOM, deleteroom, read_all_room, read_one_room, updateroom,updateRoomAvailability } from "../controllers/room.js";
import { verifyadmin } from "../utils/verifytokens.js";

const router = express.Router();

// Create a new hotel
router.post("/:hotelId",verifyadmin,createROOM );


//update 
router.put("/:id",verifyadmin ,updateroom);
//delete 
router.delete("/:id/:hotelId",verifyadmin,deleteroom);
// get 
router.get("/:id",read_one_room);
//get all
router.get("/",read_all_room);

router.put("/availability/:id", updateRoomAvailability);

export default router;
