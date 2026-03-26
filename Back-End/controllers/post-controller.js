const Post=require('../models/post')
const User=require('../models/user')
const cloudinary=require('../helper/cloudinary-helper')
const socketManager=require('../util/socketManager')
const { populate } = require('dotenv')




const createPost=async(req,res)=>{

  try{
    console.log('in post controller')

    const {title,caption}=req.body
    const uploadedBy=req.userId
    const files=req.files
    let image=[]
    for(let i=0;  i<files.length; i++){
      const {url}=await cloudinary.uploadToCloudinary(files[i].path)
      image.push(url)
    }
    
    const post=new Post({title,caption,uploadedBy,image})
    await post.save()
    return res.status(200).json({success:true,message:'Post uploaded successfully',post})
    
  }catch(e){
    console.log(e)
    return res.status(400).json({success:false,message:"Failed to upload Post"})

  }

}

const findPosts=async(req,res)=>{

  try{
    const posts=await Post.find({uploadedBy:req.userId})
    .populate('uploadedBy','userName').populate('likedBy','userName')
    posts.forEach((post)=>{
      post.likedByCurrentUser=post.likedBy?.some((p)=>String(p._id)===String(req.userId))
    })
    res.status(200).json({success:true,message:'posts fetched successfully',posts})
  }catch(e){
    console.log('error while fetching posts',e)
    res.status(400).json({success:false,message:`error while fetching images: ${e.message}`})
  }
}

const addLike=async(req,res)=>{
  try{
     const io=socketManager.getIo()
    const user=await User.findById(req.userId)
    const id=req.params.id
    const post=await Post.findById(id)
     io.emit('liked_post',{
        userName:user.userName,
        postId:id,
        postUploadedBy:post.uploadedBy
    })
   
    
    if(!user.likedPosts.includes(id)){
      user.likedPosts=[id,...user.likedPosts]
    }
    //const post=await Post.findById(id)
    if(!post.likedBy.includes(req.userId)){
     
      post.likedBy=[req.userId,...post.likedBy]
      post.likedByCurrentUser=true
      post.likes+=1
    }else{
      user.likedPosts=user.likedPosts.filter((pId)=>String(pId)!==String(id))
      post.likedBy=post.likedBy.filter((uId)=>String(uId)!==String(user._id))
      post.likedByCurrentUser=false
      post.likes-=1
    }
    post.populate('likedBy')
    await post.save()
    await user.save()
    return res.status(200).json({success:true,message:'post liked successfully',post})
  }catch(e){
    console.log(e)
    res.status(500).json({success:false,message:"error occurred please try again later"})
  }
  
}

const fetchAllPosts=async(req,res)=>{
  try{
    const pageNumber=(req.query.page)|| 1
    const postsPerPage=4
    const totalPosts=Post.countDocuments()
    const totalPages=Math.floor((totalPosts/postsPerPage))
    const allPosts=await Post.find()
    .populate('uploadedBy','userName profilePic').populate('likedBy','userName').populate({path:'comments',populate:'user'})
    .skip((pageNumber-1) * postsPerPage).limit(postsPerPage)
    allPosts.forEach((post)=>{
      post.likedByCurrentUser=post.likedBy?.some((i)=>String(i._id)===String(req.userId))
      
      //post.currentUsersFavourite=post.likedBy.some((i)=>String(i._id)===String(req.userId))
    })
    return res.status(200).json({success:true,allPosts})
  }catch(e){
    console.log(e)
    return res.status(200).json({success:false,message:`failed to fetch all posts ${e.message}`})
  }

}

const getPostDetails=async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id).populate('likedBy','userName')
    return res.status(200).json({success:true,post})
  }catch(e){
    console.log(e)
    res.status(500).json({success:false,message:`error while fetching image ${e.message} `})
  }
}

const editPost=async(req,res)=>{
  let {title,caption}=req.body
  try{
    const post=await Post.findById(req.params.id)
    if(!post){
      return res.status(400).json({success:false,message:'post not available'})
    }
    if(!title){
      title=post.title
    }
    title ? post.title=title : title=post.title
    caption ? post.caption=caption : caption=post.caption
    await post.save()
    return res.status(200).json({success:true,message:'post edited successfully',post})

  }catch(e){
    console.log(e)
    res.status(500).json({success:false,message:`failed to edit post ${e.message}`})
  }
}

const postsPagination=async(req,res)=>{
  try{
    const page=parseInt(req.query.page) || 1
    const perPage=4
    const totalPosts=Post.countDocuments()
    const totalPage=Math.floor((totalPosts/perPage))
    if(page>totalPage){
      return res.status(404).json({success:false,message:'Page not Found'})
    }
    const user=await User.findById(req.userId)
    const posts=await Post.find({uploadedBy:user.following}).sort({likes:-1}).skip((page-1)*perPage).limit(perPage)
    .populate('likedBy','userName').populate('uploadedBy').
    populate({path:'comments',populate:{path:'user'}})
    posts.forEach((post)=>{
      post.likedByCurrentUser=post.likedBy?.some((p)=>String(p._id)===String(req.userId))
    })
    return res.status(200).json({success:true,message:'fetched posts successfull',posts})
  }catch(e){
    return res.status(500).json({success:false,message:`failed to fetch posts ${e.message}`})
  }
}


const deletePost=async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id)
    const check=String(post.uploadedBy)===String(req.userId)
    if(!check){
      return  res.status(403).json({success:false,message:'you are not authorized to delete this post',post})
    }
    await Post.findByIdAndDelete(req.params.id)
    return  res.status(200).json({success:true,message:'delete post successfully',post})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:false,message:'something went wrong'})
  }

}

const addPostToFavourite=async(req,res)=>{
  try{
    const postId=req.params.postId
    const post=await Post.findById(postId)
    const user=await User.findById(req.userId)
    const check=user.FavouritePosts.find((p)=>String(p)===String(post._id))
    if(check){
      user.FavouritePosts=user.FavouritePosts.filter((p)=>String(p)!==String(post._id))
      
    }else{
      user.FavouritePosts=[post._id,...user.FavouritePosts]
    }
    await user.save()
    return res.status(200).json({success:true,message:'post added to favourites',userFavourites:user.FavouritePosts})
  }catch(e){
    console.log(e)
  }
}

const getUserFavourites=async(req,res)=>{
  try{
    const user=await User.findById(req.userId).populate({
      path:'FavouritePosts',
      populate:[
        {path:'uploadedBy',select:'userName profilePic'},
        {path:'likedBy',select:'userName'}
      ]
    })
   
    return res.status(200).json({success:true,userFavourites:user.FavouritePosts})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:false,message:`${e.message}`})
  }
}


module.exports = {
  createPost,
  findPosts,
  addLike,
  fetchAllPosts,
  getPostDetails,
  editPost,
  postsPagination,
  deletePost,
  addPostToFavourite,
  getUserFavourites,
};