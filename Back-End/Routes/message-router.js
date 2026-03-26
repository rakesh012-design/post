const express=require('express')

const userMiddleWare=require('../middlewares/user-middleware')
const messageController=require('../controllers/message-controller')



const router=express.Router()


router.post('/send-message',userMiddleWare.authenticateUser,messageController.sendMessage)
router.get('/get-messages/:userId',userMiddleWare.authenticateUser,messageController.getMessages)


module.exports=router