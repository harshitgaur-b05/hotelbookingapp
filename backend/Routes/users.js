import express from "express";
import {  deletedata, read_all_data, read_one_data, updatedata } from "../controllers/user.js";
import { verifyadmin, verifytokens, verifyUser } from "../utils/verifytokens.js";

const router = express.Router();


// router.get("/checkauth",verifytokens,(req,res,next)=>{
//     res.send("hello user you are authenticated")
// })

// router.get("/varifyuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user!! you are logged inn and you can delete the account ")
// })
// router.get("/checkadmin/:id",verifyadmin,(req,res,next)=>{
//     res.send("hello admin!! you are logged inn and you can delete all account ")
// })
//update 
router.put("/:id",verifyUser ,updatedata);
//delete 
router.delete("/:id",verifyUser,deletedata);
// get 
router.get("/:id",verifyUser,read_one_data);
//get all
router.get("/",verifyadmin,read_all_data);
export default router;
