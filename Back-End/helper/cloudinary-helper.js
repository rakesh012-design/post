const cloudinary=require('../util/cloudinray-util')


const uploadToCloudinary=async(filePath)=>{
  try{
    const result =await cloudinary.uploader.upload(filePath)
    return {
      url:result.secure_url,
      publicId:result.public_id
    }

  }catch(e){
    console.log('error while uploading to cloudinary')
    throw new Error('error while uploading to cloudinary',e.message)
  }
}

module.exports={uploadToCloudinary}