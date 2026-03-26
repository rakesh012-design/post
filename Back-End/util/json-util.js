
const showJsonMessage=(res,statusCode,success,message)=>{
  res.status(statusCode).json({success:success,message:message})
}

module.exports=showJsonMessage