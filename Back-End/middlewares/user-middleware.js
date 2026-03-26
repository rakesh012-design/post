require('dotenv').config()
const User=require('../models/user')
const jsonUtil=require('../util/json-util')
const jwt=require('jsonwebtoken')


const authenticateUser=(req,res,next)=>{
  try{
    const token=req.cookies.token
    //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTg0NzZiZWEzOTg2MzMzOWExMTE4MjIiLCJpYXQiOjE3NzM5ODE1MDAsImV4cCI6MTc3Mzk4NTEwMH0.RVIKFHa0nnEJDR6huhUxYdDpSkdqFI1teNZJFEqexS4'
    if(!token){
      return jsonUtil(res,401,false,'user is not logged in. Pleases login to continue')
    }
    const decoded_one=jwt.verify(token,process.env.JWT_SECRET_KEY)
    //console.log(decoded_one.accessToken)
    const decoded=jwt.verify(decoded_one.accessToken,process.env.JWT_SECRET_KEY)
    req.userId=decoded['userId']
    next()
  }catch(e){
    //console.log(e) 
    if(e.name==='TokenExpiredError'){
      res.clearCookie('token')
      return jsonUtil(res,500,false,'Token Expired')
    }
    return jsonUtil(res,500,false,e.message)
  }
  
}

module.exports={authenticateUser}