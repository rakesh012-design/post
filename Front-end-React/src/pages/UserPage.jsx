
import Post from '../components/Post'
import { Button, TextField } from '@mui/material'
import { useUser } from '../hooks/useUser'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Chat, Close, Send } from '@mui/icons-material'


const UserPage = () => {
  const navigate=useNavigate()
  
  const {user,posts,followState,handleFollowOrUnfollow,followers,following,isCurrentUser,sendMessage,messages}=useUser()

  const[openMessageBox,setOpenMessageBox]=useState(false)
  const[openChatBox,setOpenChatBox]=useState(false)

  const handleMessageBox=()=>{
    setOpenMessageBox(!openMessageBox)
  }
  const handleOpenChatBox=()=>{
    setOpenChatBox(!openChatBox)
  }

  
  return (
    <div>
      <ToastContainer position='top-center' autoClose={3000}/>
      <div className='flex w-screen gap-10'>
      <div>
      <img src={user?.profilePic} height={100} width={100} style={{borderRadius:'50%' }}/>
      <p className='text-black font-bold'>{user?.userName}</p>
      {isCurrentUser ? '' :
      <Button onClick={()=>{
        handleFollowOrUnfollow(user?._id)
      }} variant='outlined'>{
        followState
      }</Button>}
      </div>
      <div>
        <h5>posts</h5>
        <p className='text-center text-black text-2xl'>{posts?.length}</p>
      </div>
      <div className='float-end' onClick={()=>{
        navigate(`/home/user/${user._id}/followers`)
      }}>
        <h5 className='cursor-pointer'>Followers</h5>
        <p className='text-center text-black text-2xl'>{followers}</p>
      </div>
       <div className='float-end' onClick={()=>{
        navigate(`/home/user/${user._id}/following`)
      }}>
        <h5 className='cursor-pointer' >Following</h5>
        <p className='text-center text-black text-2xl'>{following}</p>
      </div>
      <div>
        <Button onClick={handleMessageBox} variant='outlined'
        style={{color:openMessageBox?'red' :''}}
        >
          {openMessageBox ? 'close' : 'send message'}
          </Button>
        {openMessageBox && 
        <div className='absolute'>
          <form className='flex justify-center' onSubmit={(e)=>{sendMessage(e)}}>
          <TextField type='text' name='message' placeholder='send Message' size='small'/>
          <input type='text' value={user?._id} name='userId' hidden/>
          <button type='submit' ><Send style={{fill:'blue'}}/></button>
          </form>
        </div>}
      </div>
      <div>
        <button onClick={handleOpenChatBox}>{openChatBox ? <Close/> :<Chat />}</button>
      </div>
      <div>
      {openChatBox && <div className='absolute'>
        {messages.map((message)=>(
          <div className='flex' style={{background:'gray'}}>
            {message.sender._id===user._id ?
            <div className='flex gap-3'>
              <span>{message.sender.userName}</span>
              <p className='text-white font-bold'>{message.message}</p>
              </div>
              :
              <div className='flex gap-3'>
              <span>you</span>
              
              <p className='text-white font-bold'>{message.message}</p>
              </div>
            }
          </div>
        ))}
      </div>}
      </div>
      </div>
      <div className='mt-2'>
        {posts?.map((post,idx)=><Post key={idx} post={post}/>)}
      </div>
    </div>
  )
}

export default UserPage