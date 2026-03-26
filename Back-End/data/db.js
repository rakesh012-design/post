require('dotenv').config()
const mongoose=require('mongoose')


const connectDb=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('successfully Connected to mongoDB')
  }catch(e){
    console.log(e)
    process.exit(1)
  }

}

module.exports=connectDb