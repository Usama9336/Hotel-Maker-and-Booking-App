import mongoose from 'mongoose'
const {Schema}=mongoose;
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
   email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
      type:String,
      required:true
    },
isadmin:{
    type:Boolean,
    default:false
},
city:{
    type:String,
    required:true,
},
country:{
    type:String,
    required:true,
},
img:{
  type:String,
  
},
phone:{
    type:String,
    required:true,

},
},
{timestamps:true}
)
export default mongoose.model("Users",userSchema)