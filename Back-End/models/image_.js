const mongoose=require('mongoose')


const imageSchema=mongoose.Schema({
  url:{
    type:String,
    require:true
  },
  publicId:{
    type:String,
    required:true
  },
  uploadedBy:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
},{timestamps:true})

module.exports=mongoose.model('Image',imageSchema)