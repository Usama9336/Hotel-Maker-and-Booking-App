import express from "express"
import { deleteUser, getallUser, getUser, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyuser } from "../utils/verifytoken.js"
const router=express.Router()
 
router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id",verifyuser,(req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin, you are logged in and you can delete all account")
})
//update
router.put("/:id",verifyuser,updateUser)
//delete
router.delete("/:id",verifyuser,deleteUser)
//get
router.get("/:id",verifyuser,getUser)
//getall
router.get("/",verifyAdmin,getallUser)

export default router