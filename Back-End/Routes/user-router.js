const express=require('express')
const router=express.Router()
const userController=require('../controllers/user-controller')
const userMiddleWare=require('../middlewares/user-middleware')
const imageMiddleWare=require('../middlewares/image-uploader')


router.post('/signup',userController.signUpUser)
router.post('/login',userController.loginUser)
router.post('/verify-user',userController.verifyUser)
router.post('/forgot-password',userController.forgotPassword)
router.post('/verify/forgot-passowrd',userController.verifyForgotPasswordToken)
router.get('/fetch-user/me',userMiddleWare.authenticateUser,userController.getCurrentUser)
router.post('/logout',userMiddleWare.authenticateUser,userController.logout)
//router.get('/check',userMiddleWare.authenticateUser,userController.check)
router.get('/check',userMiddleWare.authenticateUser,userController.check)
router.post('/change-password',userMiddleWare.authenticateUser,userController.changePassword)
router.post('/google-login',userController.googleLogin)
router.patch('/edit-user',userMiddleWare.authenticateUser,userController.editUser)
router.post('/upload/profile-picture',userMiddleWare.authenticateUser,imageMiddleWare.uploadSingleImage,userController.uploadProfilePicture)
router.get('/get-foreign-user/:id',userMiddleWare.authenticateUser,userController.getForeignUser)
router.post('/follow-or-unfollow',userMiddleWare.authenticateUser,userController.followOrUnfollow)
router.get('/get-user-followers/:id',userMiddleWare.authenticateUser,userController.getUserFollowers)
router.get('/get-user-following/:id',userMiddleWare.authenticateUser,userController.getUserFollowing)
router.post('/add-comment',userMiddleWare.authenticateUser,userController.addComment)



module.exports=router