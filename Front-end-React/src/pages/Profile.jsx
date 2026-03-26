import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CgProfile, CgSpinner} from 'react-icons/cg'
import {Button} from '@mui/material'
import { uploadProfilePicture } from '../store/userStore'
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const dispatch=useDispatch()
  const formData=new FormData()
  const navigate=useNavigate()


  const store=useSelector((store)=>store.userStore)
  const user=store.user
  const [isLoading,setIsLoading]=useState(false)

  const handleImageChange=(e)=>{
    //console.log(e.target.files[0])
    formData.append('image',e.target.files[0])
  }
  const handleonSubmit=async(e)=>{
    setIsLoading(true)
    e.preventDefault()
    const res=await dispatch(uploadProfilePicture(formData))
    console.log(res.payload)
    setIsLoading(false)
    if(res.payload.success===true){
      toast.success(res.payload.message)
    }else{
      toast.error(res.payload.message)
    }
  }
  console.log(user)

  return (
    <div className="row d-flex justify-content-center">
      <ToastContainer position='top-right' autoClose={3000}/>
        <div className="col col-lg-7 mb-4 mb-lg-0">
          <div className="card" style={{borderRadius: ".5rem"}}>
            <div className="row g-0">
             <div className="col-md-4 gradient-custom text-center text-black items-center flex flex-col" >
              {user?.profilePic ? <img src={user?.profilePic} 
              referrerPolicy='no-referrer'
              style={{ width: "80px", height: "80px", borderRadius: "50%" }} /> :
                <CgProfile className="img-fluid my-5" style={{width: "80px"}}/>}
                <p>change profile picture</p>
                <form className='form-outline' onSubmit={handleonSubmit}>
                  <input className='form-control' type='file'  accept='image/*' onChange={handleImageChange}/>
                  <Button variant='outlined' type='submit'>{isLoading ? <CgSpinner className='animate-spin'/>:"upload"}</Button>
                </form>
                <h1>{user?.userName}</h1>
              </div>
              
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Information</h6>
                  <hr className="mt-0 mb-4"/>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{user?.email}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Liked Posts</h6>
                      <p className="text-muted">{user?.likedPosts?.length || 0}</p>
                    </div>
                  </div>
                  <h6>status</h6>
                  <hr className="mt-0 mb-4"/>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6 className='hover:cursor-pointer' onClick={()=>{
                        navigate(`/home/user/${user?._id}/followers`)
                      }}>Followers</h6>
                      {user?.followers?.length}
                    </div>
                    <div className="col-6 mb-3">
                      <h6 className='cursor-pointer' onClick={()=>{
                        navigate(`/home/user/${user?._id}/following`)
                      }}>Following</h6>
                      <p className="text-muted">{user?.following?.length}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start">
                    <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                    <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                    <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile
