import Users from "../modals/Users.js"
import bcrypt from "bcryptjs"
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"
export const register=async(req,res,next)=>{
    
try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

const newuser=new Users({
    ...req.body,
    password:hash,
})
await newuser.save()
res.status(200).send("User has been created")
}
catch(err)
{ 
    next(err)
}
}

export const login=async(req,res,next)=>{
    
    try{
        const user=await Users.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found"))
const ispasswordCorrect=await bcrypt.compare(req.body.password,user.password)
if(!ispasswordCorrect) return next(createError(400,"Wrong password or username"))
const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);

const {password,isAdmin,...otherDetails}= user._doc ;
res.cookie("access_token",token,{
    httpOnly:true,
}).status(200).json({details:{...otherDetails,isAdmin}})
    }
    catch(err)
    { 
        next(err)
    }
    
    }