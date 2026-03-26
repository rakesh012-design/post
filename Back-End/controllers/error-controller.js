const jsonUtil=require('../util/json-util')


const pageNotFoundError=async(req,res)=>{
  console.log('page not Found',req.url)
  return jsonUtil(res,200,false,'page not found')
}

module.exports=pageNotFoundError