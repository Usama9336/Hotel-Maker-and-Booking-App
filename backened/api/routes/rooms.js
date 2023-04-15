import express from "express"
import { createRoom, deleteRoom, getallRoom, getRoom, updateRoom, updateRoomavailibility } from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifytoken.js"
const router=express.Router()

//import Hotels from "../modals/Hotels.js";
//import { createError } from "../utils/error.js";

//create
router.post("/:hotelid",verifyAdmin, createRoom)
//update
router.put("/:id",verifyAdmin,updateRoom)

router.put("availability/:id",updateRoomavailibility)
//delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)
//get
router.get("/:id",getRoom)
//getall
router.get("/",getallRoom)

export default router