import Users from "../modals/Users.js"

//update
export const updateUser=async(req,res,next)=>{
    try {
        const updateUser=await Users.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
    } catch (err) {
next(err)
    }
}
//delete
export const deleteUser=async(req,res,next)=>{
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    } catch (err) {
next(err)
    }
}
//get
export const getUser=async(req,res,next)=>{
    try {
        const getUser=await Users.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (err) {
next(err)
    }
}
//getall
export const getallUser=async(req,res,next)=>{
    try {
        const allUser=await Users.find()
        res.status(200).json(allUser)
    } catch (err) {
next(err)
    }
}
