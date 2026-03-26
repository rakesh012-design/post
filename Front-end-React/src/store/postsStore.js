import {createAsyncThunk, createSlice,current} from '@reduxjs/toolkit'
import {socket} from './socket'

const backEndUrl=process.env.NODE_ENV==='production' ? '' :'http://localhost:3000'
//const backEndUrl='http://localhost:3000'
console.log('this is backendurl from post store',backEndUrl)

export const getPosts=createAsyncThunk('getPosts',
  async(pageNum)=>{
    //console.log(pageNum)
    try {
      const res=await fetch(`http://localhost:3000/api/random/post/pagination?page=${pageNum || 1}`,{
        method:"GET",
        credentials:'include'
      })
      const data=await res.json() 
      return data
    } catch (error) {
      console.log(error,'error while performing getPosts')
      return {success:false,message:e.message}
    }
  }
)

export const likePost=createAsyncThunk('likePost',
  async({id})=>{

   const res=await fetch(`http://localhost:3000/api/random/post/like-post/${id}`,{
    method:'POST',
    credentials:'include'
   })
   socket.emit('liked_post')
    const data=await res.json()
    return data
  }
)

export const fetchAllPosts=createAsyncThunk('fetchAllPosts',
  async(pageNum)=>{
    const res=await fetch(`http://localhost:3000/api/random/post/all-posts?page=${pageNum || 1}`,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    return data
  }
)

export const createPost=createAsyncThunk('createPost',
  async({formData})=>{
    const res=await fetch('http://localhost:3000/api/random/post/upload-posts',{
      method:"POST",
      credentials:'include',
      body:formData
    })
    const data=await res.json()
    return data
  }
)

export const getPostDetails=createAsyncThunk('getPostDetails',
  async(id)=>{
    const res=await fetch(`http://localhost:3000/api/random/post/single-post/${id}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    return data
  })

export const editPost=createAsyncThunk('editPost',
  async({id,title,caption})=>{
    console.log(id,title,caption)
    
    const res=await fetch(`http://localhost:3000/api/random/post/edit-post/${id}`,{
      method:"PATCH",
      credentials:'include',
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({title,caption})
    })
    const data=await res.json()
    return data
  } 
)  

export const deletePost=createAsyncThunk('deletePost',
  async({id})=>{
    const res=await fetch(`http://localhost:3000/api/random/post/delete-post/${id}`,{
      method:"DELETE",
      credentials:'include'
    })
    const data=await res.json()
    return data
  }
)

export const addComment=createAsyncThunk('addComment',
  async({postId,comment})=>{
    const res=await fetch('http://localhost:3000/api/random/add-comment',{
      method:"POST",
      credentials:'include',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({postId,comment})
    })
  })




const postSlice=createSlice({
  name:'postSlice',
  initialState:{
    posts:[],
    allPosts:[],
    postTobeEdited:{}
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getPosts.fulfilled,(state,action)=>{
      state.posts=action.payload.posts
      //state.allPosts=action.payload.posts
    })
    builder.addCase(likePost.fulfilled,(state,action)=>{
      const liked_post=action.payload.post
      const posts=state.posts
      const post=posts.find((p)=>String(p._id)===String(liked_post._id))
      if(post){
        post.likes=liked_post.likes
        post.likedBy=liked_post.likedBy
        post.likedByCurrentUser=liked_post.likedByCurrentUser
      }
      const allPosts=state.allPosts
      const p2=allPosts.find((p)=>String(p._id)===String(liked_post._id))
      if(p2){
        p2.likes=liked_post.likes
        p2.likedBy=liked_post.likedBy
        p2.likedByCurrentUser=liked_post.likedByCurrentUser 
      }
    })
    builder.addCase(fetchAllPosts.fulfilled,(state,action)=>{
      state.allPosts=action.payload.allPosts
    })
    builder.addCase(createPost.fulfilled,(state,action)=>{
      state.posts=[action.payload.post,...state.posts]
    })
    builder.addCase(getPostDetails.fulfilled,(state,action)=>{
      const actPost=action.payload.post
      const post=state.allPosts.find((p)=>String(p._id)===String(actPost._id))
      if(post){
        console.log('post found')
        post.likedBy=action.payload.post.likedBy
        post.likes=action.payload.post.likes
        
      }
      state.postTobeEdited=action.payload.post
    })
    builder.addCase(editPost.fulfilled,(state,action)=>{
      const editedPost=action.payload.post
      const post=state.posts.find((pos)=>String(pos._id)===String(editedPost._id))
      if(post){
        post.title=editedPost.title
        post.caption=editedPost.caption
      }
    })
    builder.addCase(deletePost.fulfilled,(state,action)=>{
      const deletedPost=action.payload.post
      state.posts.filter((p)=>p._id!=deletedPost._id)
      state.allPosts.filter((p)=>p._id=deletePost._id)
    })
  }}
)

export default postSlice