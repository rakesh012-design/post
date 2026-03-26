const mongoose=require('mongoose')


const postSchema=mongoose.Schema({
  likes:{
    type:Number,
    default:0
  },
  caption:{
    type:String,
    default:''
  },
  title:{
    type:String,
    required:true
  },
  image:[
    {
    type:String,
    required:true}
  ]
  ,
  uploadedBy:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
  },
  likedBy:[
    {
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }
  ],
  likedByCurrentUser:{
    type:Boolean,
    default:false
  },
  comments:[{
      user:{type:mongoose.Schema.ObjectId,ref:'User'},
      comment:{type:String,required:true}
    }]
},{timeStamps:true})


module.exports=mongoose.model('Post',postSchema)