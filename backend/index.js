import express, { Router } from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";


import authRoute from "./Routes/auth.js";
import hotelRoute from "./Routes/hotel.js";
import Roomsroute from "./Routes/room.js"
import userRoute from "./Routes/users.js";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config(); 
await mongoose.connect(process.env.MONGO)
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/hotel",hotelRoute)
app.use("/api/rooms",Roomsroute)
app.use("/api/user",userRoute)
//error handling middle wares
app.use((err,req,res,next)=>{
return res.status(400).json("hello there is a error")
})
app.listen(3300,()=>{
    console.log("connected to backend")});
