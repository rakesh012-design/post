import { useState } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {socket} from '../store/socket'




export const useUser=()=>{

  const [followState,setFollowState]=useState()
  const [followers,setFollowers]=useState()
  const [following,setFollowing]=useState()

  const [posts,setPosts]=useState()
  const [user,setUser]=useState()

  const url=useLocation()
  const url_li=url.pathname.split('/')
  const userIdUrl=url_li[url_li.length-1]

  const currUser=useSelector((store)=>(store.userStore))?.user

  const isCurrentUser=String(currUser?._id)===String(userIdUrl)

  const getUser=async(id)=>{
    const res=await fetch(`http://localhost:3000/api/random/get-foreign-user/${id}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    setPosts(data.posts)
    setUser(data.user)
    const isFollowing=data?.user?.followers?.includes(currUser?._id)
    const newState=isFollowing ? 'unfollow' :'follow'
    setFollowState(newState)
    setFollowers(data.user?.followers.length)
    setFollowing(data.user?.following.length)
    return data
  }
  useEffect(()=>{


    const anFn=async()=>{
      await getUser(userIdUrl)
      await getMessages()
    }
    anFn()
    socket.on('message_sent',()=>{
      getMessages()
    })
  },[currUser])


  const followOrUnfollow=async(userId)=>{
    
    const res=await fetch('http://localhost:3000/api/random/follow-or-unfollow',{
      method:"POST",
      credentials:'include',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({userId})
    })
    const data=await res.json()
    if(!data.success){
      toast.error(data.message)
    }
  }
  const handleFollowOrUnfollow=async(id)=>{
    await followOrUnfollow(id)
    const res=await getUser(userIdUrl)
    setFollowers(res?.user?.followers.length)
    setFollowing(res?.user?.following.length)
    if(followState==='follow'){
      setFollowState('unfollow')
    }else{
      setFollowState('follow')
    }
  }

  const [messages,setMessage]=useState()

  
  const sendMessage=async(e)=>{
    e.preventDefault()
    console.log(e.target)
    const formData=new FormData(e.target)
    const userId=formData.get('userId')
    const message=formData.get('message')
    const res=await fetch('http://localhost:3000/api/random/message/send-message',{
      method:"POST",
      credentials:'include',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({userId,message})
    })
    const data=await res.json()
    setMessage((prevMessages)=>{
      return [...prevMessages,data.newMessage]
    })
    console.log(res)

  }
  

  const getMessages=async()=>{
    const res=await fetch(`http://localhost:3000/api/random/message/get-messages/${userIdUrl}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    setMessage(data.messages) 
  }


  return {
    followOrUnfollow,
    followState,
    setFollowState,
    getUser,
    posts,
    user,
    handleFollowOrUnfollow,
    followers,
    following,
    isCurrentUser,
    sendMessage,
    messages
  };

}