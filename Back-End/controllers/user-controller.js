require('dotenv').config({quiet:true})
const User=require('../models/user')
const jsonUtil=require('../util/json-util')
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
const jwt=require('jsonwebtoken')
const {sendVerificationCodeEmail}=require('../helper/mailTrap')
const {OAuth2Client}=require('google-auth-library')
const {uploadToCloudinary}=require('../helper/cloudinary-helper')
const client=new OAuth2Client('622527416169-o52p3r9sli8a6kchm9k11fldn5ofvn5d.apps.googleusercontent.com')
const nodeMailer=require('../helper/nodemailer')
const Post=require('../models/post')

const signUpUser=async(req,res)=>{
  try{
    const {userName,email,password}=req.body
    const isExistingUser=await User.findOne({email})
    if(isExistingUser){
      return jsonUtil(res,400,false,'User already Exists')
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const user=new User({
      userName,
      email,
      password:hashedPassword,
      verificationToken:Math.floor(100000+Math.random()*900000).toString(),
      verificationTokenExpiresAt:Date.now()+15*60*1000
    })
    await sendVerificationCodeEmail(user.email,user.verificationToken)
    await user.save()
    return res
      .status(200)
      .json({ success: true,
        message: "user has been created successfully" ,
        user:{
          ...user._doc,
          password:undefined
        }
      });
  }catch(e){
    console.log(e)
    return jsonUtil(res,400,false,e.message)
  }
}

const verifyUser=async(req,res)=>{
  try{
    const {verificationCode}=req.body
    const user=await User.findOne({
      verificationToken:verificationCode,
      verificationTokenExpiresAt:{$gt:Date.now()}
    })
    if(!user){
      return res.status(400).json({success:false,message:"User not found"})
    }
    if(verificationCode!==user.verificationToken){
      return res.status(400).json({success:false,message:"Invalid verification Code"})
    }
    user.isVerified=true
    user.verificationTokenExpiresAt=undefined
    user.verificationToken=undefined
    await user.save()
    return res.status(200).json({success:true,message:'user has been verified please login and continue...',user:{...user._doc,password:undefined}})
  }catch(e){
    return res.status(500).json({success:false,message:e.message})
  }
}

const loginUser=async(req,res)=>{
  console.log('in login user')
  try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
      return jsonUtil(res,400,false,'user does not exist')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return jsonUtil(res,400,false,'Invalid Credentials')
    }
    const accessToken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    const refreshToken=jwt.sign({accessToken},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    res.cookie('token',refreshToken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
    })
    user.password=undefined
    return res.status(200).json({success:true,message:'login successful',user})
  }catch(e){
    console.log(e)
    return jsonUtil(res,400,false,e.message)
  }
}

const getCurrentUser=async(req,res)=>{
  try{
    const user=await User.findById(req.userId)
    user.password=undefined
    return res.status(200).json({success:true,user})
  }catch(e){
    console.log(e)
    res.status(500).json({success:false,message:`user not found ${e.message}`})
  }

}

const logout=async(req,res)=>{
  try{
    res.clearCookie('token')
    return res.status(200).json({success:true,message:'logged out successfully'})
  }catch(e){
    res.status(500).json({success:false,messsage:`error while logging out ${e.message}`})
  }
}
const check=async(req,res)=>{
  console.log('incheck')
  try{
    if(!req.userId){
      return res.status(403).json({success:false,message:'session expired'})
    }
    return res.status(200).json({success:true,message:'user is already logged in'})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:true,message:`error: ${e.message}`})
  }
}

const googleLogin=async(req,res)=>{
  try{
    const {googleToken}=req.body
    const ticket=await client.verifyIdToken({
      idToken:googleToken,
      audience:'622527416169-o52p3r9sli8a6kchm9k11fldn5ofvn5d.apps.googleusercontent.com'
    })
    const userInfo=ticket.getPayload()
    const user=await User.findOne({email:userInfo.email})
    if(!user){
      const user=new User({email:userInfo.email,password:'123456',userName:userInfo.name})
      await user.save()
    }
    if(user && !user.profilePic){
      user.profilePic=userInfo.picture
      await user.save()
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    res.cookie('token',token,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,

    })
    return res.status(200).json({success:true,message:'user Logged in successfully'})
  }catch(e){
    console.log(e)
  }
}

const changePassword=async(req,res)=>{
  try{
    const user=await User.findById(req.userId)
    const {oldPassword,newPassword}=req.body
    if(!oldPassword || !newPassword){
      return res.status(403).json({success:false,message:'please  Enter both the passwords'})
    }
    const salt=await bcrypt.genSalt(10)
    const check=await bcrypt.compare(oldPassword,user.password)
    if(!check && oldPassword!==user.password){
      return res.status(403).json({success:false,message:'Wrong Password'})
    }
    const hashedNewPassword=await bcrypt.hash(newPassword,salt)
    user.password=hashedNewPassword
    await user.save()
    return res.status(200).json({success:true,message:'password change successfully'})
  }catch(e){
    return res.status(403).json({success:false,message:`something went wrong please try again ${e.message}`})
  }

}

const editUser=async(req,res)=>{
  try{
    const user=await User.findById(req.userId)
    let {newUserName,newEmail}=req.body
    if(newUserName===''){
      newUserName=user.userName
    }else{
      user.userName=newUserName
    }
    if(newEmail===''){
      newEmail=user.email
    }else{
      user.email=newEmail
    }
    await user.save()
    user.password=undefined
    return res.status(200).json({success:true,message:'changes saved Successfully',user})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:false,message:`something went wrong try again ${e.message}`})
  }
}

const uploadProfilePicture=async(req,res)=>{
  try{
    console.log('from controller',req.file.path)
    const image=await uploadToCloudinary(req.file.path)
    const user=await User.findById(req.userId)
    user.profilePic=image.url
    await user.save()
    user.password=undefined
    return res.status(200).json({success:true,message:'picture added successfully',profilePic:user.profilePic})
  }catch(e){
    console.log(e)
    return res.status(400).json({success:false,message:`error while changing profile picture ${e.message}`})
  }

}

const forgotPassword=async(req,res)=>{
  try{
    const {email}=req.body
    const user=await User.findOne({email})
    user.verificationToken=crypto.randomBytes(32).toString('hex')
    await user.save()
    user.password=undefined
    await nodeMailer.sendPasswordResetEmail(email,user.verificationToken)
    return res.status(200).json({success:true,message:'verification code has been sent to your email',user})
  }catch(e){
    return res.status(500).json({success:false,message:`something went try again later ${e.message}`})
  }
}

const verifyForgotPasswordToken=async(req,res)=>{
  try{
    const {verificationToken}=req.body
    const user=await User.findOne({verificationToken:verificationToken})
    if(!user){
      return res.status(400).json({success:false,message:'user not found'})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash('123456',salt)
    user.password=hashedPassword
    await user.save()
    return res.status(200).json({success:true,message:'your password has been reset to 123456 please change it.'})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:false,message:`something went wrong ${e.message}`})
  }
}

const getForeignUser=async(req,res)=>{
 try {
   const userId=req.params.id
   const user=await User.findById(userId)
   const posts=await Post.find({uploadedBy:user._id}).populate('uploadedBy').populate('likedBy','userName')
   user.password=undefined
   //console.log(posts)
   return res.status(200).json({success:true,message:'user Found',user,posts})
 } catch (error) {
  console.log(error.message)
  return res.status(500).json({success:false,message:`something went wrong ${error.message}`})
 }
  
}

const followOrUnfollow=async(req,res)=>{
  try {
    const {userId}=req.body
    const currUser=await User.findById(req.userId)
    const foreignUser=await User.findById(userId)
    if(currUser.following.includes(userId) && foreignUser.followers.includes(req.userId)){
      console.log('in if')
      currUser.following=currUser.following.filter((id)=>String(id)!==String(userId))
      foreignUser.followers=foreignUser.followers.filter((id)=> String(id)!==String(req.userId))
    }else{
      currUser.following=[userId,...currUser.following]
      foreignUser.followers=[req.userId,...foreignUser.followers]
      
    }
    await currUser.save()
    await foreignUser.save()
    
    return res.status(200).json({success:true,message:`action completed successfully`})
  } catch (error) {
    console.log(error)
    return res.status(200).json({success:false,message:`${error.message}`})
  }
}

const getUserFollowers=async(req,res)=>{
  try {
    const userId=req.params.id
    const user=await User.findById(userId).populate('followers')
    res.status(200)
    res.json({success:true,message:'user fetched',followers:user.followers})
    return
  } catch (error) {
    console.log(error)
    return res.status(200).json({success:false,message:error.message})
  }

}
const getUserFollowing=async(req,res)=>{
  try {
    const userId=req.params.id
    const user=await User.findById(userId).populate('following')
    res.status(200)
    res.json({success:true,message:'user fetched',following:user.following})
    return
  } catch (error) {
    console.log(error)
    return res.status(200).json({success:false,message:error.message})
  }

}

const addComment=async(req,res)=>{
  try {
    console.log('in add Comment')
    const {postId,comment}=req.body
    const post=await Post.findById(postId)
    const user=await User.findById(req.userId)

    post.comments=[{user,comment},...post.comments]
    await post.save()
    res.status(200)
    res.json({success:true,message:'comment added successfully'})
    return 
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:error.message})
  }
}

module.exports = {
  signUpUser,
  loginUser,
  verifyUser,
  getCurrentUser,
  logout,
  check,
  googleLogin,
  changePassword,
  editUser,
  uploadProfilePicture,
  forgotPassword,
  verifyForgotPasswordToken,
  getForeignUser,
  followOrUnfollow,
  getUserFollowers,
  getUserFollowing,
  addComment
};