import Hotels from "../modals/Hotels.js"
import Rooms from "../modals/Rooms.js"

export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotels(req.body)
    try {
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
next(err)
    }
}
//update
export const updateHotel=async(req,res,next)=>{
    try {
        const updateHotel=await Hotels.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateHotel)
    } catch (err) {
next(err)
    }
}
//delete
export const deleteHotel=async(req,res,next)=>{
    try {
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    } catch (err) {
next(err)
    }
}
//get
export const getHotel=async(req,res,next)=>{
    try {
        const getHotel=await Hotels.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (err) {
next(err)
    }
}
//getall
export const getallHotel=async(req,res,next)=>{
    const {min,max,...other}=req.query
    try {
        const allHotel=await Hotels.find({...other,cheapestPrice:{$gt:min|1,$lt:max||999},}).limit(req.query.limit)
        res.status(200).json(allHotel)
    } catch (err) {
next(err)
    }
}

export const countByCity=async(req,res,next)=>{
    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotels.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
next(err)
    }
}

export const countByType=async(req,res,next)=>{
    try {
        const hotelcount=await Hotels.countDocuments({type:"hotel"})
        const apartmentcount=await Hotels.countDocuments({type:"apartment"})
        const resortcount=await Hotels.countDocuments({type:"resort"})
        const villacount=await Hotels.countDocuments({type:"villa"})
        const cabincount=await Hotels.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotel",count:hotelcount},
            {type:"apartments",count:apartmentcount},
            {type:"resorts",count:resortcount},
            {type:"villas",count:villacount},
            {type:"cabins",count:cabincount}

        ])
    } catch (err) {
next(err)
    }
}

export const getHotelRooms=async(req,res,next)=>{
    try {
        const hotel=await Hotels.findById(req.params.id)
  const list=await Promise.all(hotel.rooms.map(room=>{
    return Rooms.findById(room);
  }))
  res.status(200).json(list)
    } catch (err) {
  next(err)      
    }
}