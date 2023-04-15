import Room from "../modals/Rooms.js";
import Hotel from "../modals/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom=async(req,res,next)=>{
const hotelId=req.params.hotelid;
const newRoom=new Room(req.body)

try{

const savedRoom=await newRoom.save()
try {
    await Hotel.findByIdAndUpdate(hotelId,{$push:{room:savedRoom._id}})
} catch (err) {
    next(err)
}
res.status(200).json(savedRoom)
}catch(err)
{
    next(err)
}
}
export const updateRoom=async(req,res,next)=>{
    try {
        const updateRoom=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateRoom)
    } catch (err) {
next(err)
    }
}

export const updateRoomavailibility=async(req,res,next)=>{
    try {

    await Room.updateOne({"roomNumbers._id":req.params.id},
    {
        $push:{     "roomNumbers.$.unavailableDates":req.body.dates
        }
    }
    )
res.status(200).json("Room has been updated")
    } catch (err) {
next(err)
    }
}

//delete
export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    try {
        await Hotel.findByIdAndDelete(req.params.id)
  
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{room:req.params.id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room has been Deleted")
    } catch (err) {
next(err)
    }
}
//get
export const getRoom=async(req,res,next)=>{
    try {
        const getRoom=await Hotel.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (err) {
next(err)
    }
}
//getall
export const getallRoom=async(req,res,next)=>{
    try {
        const allRoom=await Hotel.find()
        res.status(200).json(allRoom)
    } catch (err) {
next(err)
    }
}