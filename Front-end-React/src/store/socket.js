import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {io} from 'socket.io-client'
import { ToastContainer,toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getPostDetails } from './postsStore'

const url=process.env.NODE_ENV==='production' ? '' :'http://localhost:3000'

export const socket=io(url,{
  autoConnect:false,
  withCredentials:true
})



export const socketEvents=()=>{
  const dispatch=useDispatch()
  const store=useSelector((store)=>(store.userStore))
  const user=store?.user
    const likeEvent=()=>{
      socket.on('liked_post',async({ userName,postId,postUploadedBy})=>{
        await dispatch(getPostDetails(postId))
        if(user._id===postUploadedBy){
          //toast.info(`your post has been liked by ${userName}`)
        }
    })
  }

  return {likeEvent}
}