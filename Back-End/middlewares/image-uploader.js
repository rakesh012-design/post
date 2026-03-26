const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
  }
})

const checkFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else{
    cb(new Error('not an image please upload an image'))
  }
}

const uploadSingleImage=multer({storage:storage,fileFilter:checkFilter,limits:{fileSize:5*1024*1024}}).single('image')
const uploadMultipleImage=multer({storage:storage}).array('image',10)
/*
module.exports=multer({
  storage:storage,
  fileFilter:checkFilter,
  limits:{
    fileSize:5*1024*1024
  }
})*/
module.exports={uploadSingleImage,uploadMultipleImage}