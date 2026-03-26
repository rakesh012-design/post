const User=require('../models/user')
const Message=require('../models/message-model')
const socket=require('../util/socketManager')



const sendMessage=async(req,res)=>{
  try {
    const io=socket.getIo()
    io.emit('message_sent',{userId:req.userId})
    console.log(req.body)
    const {message,userId}=req.body
    console.log(message,userId)
    const senderId=req.userId
    const receiverId=userId
    const newMessage=new Message({receiver:receiverId,sender:senderId,message})
    const sender=await User.findById(senderId)
    const receiver=await User.findById(receiverId)
    sender.message=[newMessage,...sender.message]
    receiver.message=[newMessage,...receiver.message]
    await newMessage.save()
    await sender.save()
    await receiver.save()
    return res.status(200).json({success:false,message:'message sent successfully',newMessage})
  } catch (error) {
    console.log(error)
  }
}


const getMessages=async(req,res)=>{
  try {
    const receiver=req.params.userId
    const messages=await Message.find({$or:[{sender:req.userId,receiver},{sender:receiver,receiver:req.userId}]})
    .sort({createdAt:1}).populate('receiver').populate('sender')
    console.log(messages)

    return res.status(200).json({success:false,message:'success',messages})
  } catch (error) {
    console.log(error)
  }

}


module.exports={
  sendMessage,
  getMessages
}