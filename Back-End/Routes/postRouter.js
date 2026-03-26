const express=require('express')
const uploadMiddleWare=require('../middlewares/image-uploader')
const imageController=require('../controllers/image-controller')
const userMiddleWare=require('../middlewares/user-middleware')
const postController=require('../controllers/post-controller')

const router=express.Router()

//router.post('/upload',userMiddleWare.authenticateUser,uploadMiddleWare.uploadSingleImage,imageController.uploadImage,postController.createPost)
router.get('/get-posts',userMiddleWare.authenticateUser,postController.findPosts)
router.post('/like-post/:id',userMiddleWare.authenticateUser,postController.addLike)
router.get('/all-posts',userMiddleWare.authenticateUser,postController.fetchAllPosts)
router.get('/single-post/:id',userMiddleWare.authenticateUser,postController.getPostDetails)
router.patch('/edit-post/:id',userMiddleWare.authenticateUser,postController.editPost)
router.get('/pagination',userMiddleWare.authenticateUser,postController.postsPagination)
router.delete('/delete-post/:id',userMiddleWare.authenticateUser,postController.deletePost)
router.get('/add-post-to-favourites/:postId',userMiddleWare.authenticateUser,postController.addPostToFavourite)
router.get('/get-user-favourites',userMiddleWare.authenticateUser,postController.getUserFavourites)
router.post('/upload-posts',userMiddleWare.authenticateUser,uploadMiddleWare.uploadMultipleImage,postController.createPost)



module.exports= router