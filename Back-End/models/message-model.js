const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({

  receiver:{
    required:true,
    type:mongoose.Schema.ObjectId,
    ref:'User'
  },
  sender:{
    required:true,
    type:mongoose.Schema.ObjectId,
    ref:'User'
  },
  message:{
    required:true,
    type:String
  },
  sentAt:{
    type:Date,
    default:Date.now()
  }

})

module.exports=mongoose.model('Message',messageSchema)