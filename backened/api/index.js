 import express from "express"
 import dotenv from "dotenv"
 import mongoose from "mongoose"
 import authRoute from "./routes/auth.js"
 import roomsRoute from "./routes/rooms.js"
 import hotelsRoute from "./routes/hotels.js"
 import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"

 const app=express()
 dotenv.config()

 const connect=async()=>{ 
 try {
    await mongoose.connect(process.env.Mongo);
    console.log("connected to mongodB");
  } catch (error) {
    throw error;
  }
}; 

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb disconnected")
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDb connected")
})

app.get("/",(req,res)=>{
  res.send("hello first request!")  
})
//middleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use((err,req,res,next)=>{
const errorStatus=err.status || 500
const errorMessage=err.message || "Something went wrong"

  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage, 
    stack:err.stack,
})
})

 app.listen(9336,()=>{
    connect()
    console.log("connected to backened")
 })