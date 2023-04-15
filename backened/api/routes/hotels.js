import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getallHotel, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifytoken.js";
//import Hotels from "../modals/Hotels.js";
//import { createError } from "../utils/error.js";

const router=express.Router();
//create
router.post("/",verifyAdmin, createHotel)
//update
router.put("/:id",verifyAdmin,updateHotel)
//delete
router.delete("/:id",verifyAdmin,deleteHotel)
//get
router.get("/find/:id",getHotel)
//getall
router.get("/",getallHotel)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)
 
export default router