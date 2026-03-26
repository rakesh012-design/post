const Image=require('../models/image_')
const {uploadToCloudinary}=require('../helper/cloudinary-helper')
const cloudinary=require('../util/cloudinray-util')
const jsonUtil=require('../util/json-util')
const { default: mongoose } = require('mongoose')
const User=require('../models/user')


const uploadImage=async(req,res,next)=>{
  try{
    if(!req.file){
      return jsonUtil(res,400,false,'File is Required upload an Image')
    }
    console.log('file path',req.file.path)
    const {url,publicId}=await uploadToCloudinary(req.file.path)
    const uploadedBy=req.userId
    const newImage=new Image({url,publicId,uploadedBy})
    await newImage.save()
    //return jsonUtil(res,200,true,'image uploaded successfully')
    req.imageUrl=url
    next()
  }catch(e){
    console.log(e)
    return jsonUtil(res,400,false,e.message )
  }
}

const fetchImage=async(req,res)=>{
  try{
    const userId=req.userId
    const user=await User.findById(userId)
    let images=await Image.aggregate([
      {
        $match:{uploadedBy:new mongoose.Types.ObjectId(userId)}
      }
    ])
    return res.status(200).json({success:true,message:'Images fetched successfully',images:{images,user}})
  }catch(e){
    return jsonUtil(res,400,false,e.message)
  }
}

module.exports={uploadImage,fetchImage}