import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import Post from '../components/Post'
import { deletePost, editPost, getPostDetails } from '../store/postsStore'
import { useRef } from 'react'
import { ToastContainer,toast } from 'react-toastify'


const EditPage = () => {
  const url=useParams()
  const dispatch=useDispatch()

  const titleRef=useRef()
  const captionRef=useRef()

  const store=useSelector((store)=>store.postStore)
  const userStore=useSelector((store)=>store.userStore)
  console.log(userStore)
  const post=store.postTobeEdited
  console.log(post)
  useEffect(()=>{
    dispatch(getPostDetails(url.id))
  },[])

  const handleEditPost=async()=>{

    const title=titleRef.current.value
    const caption=captionRef.current.value
    const id=url.id 

    const res=await dispatch(editPost({id,title,caption}))
    if(res.payload.success===true){
      toast.success(res.payload.message)
    }else{
      toast.error(res.payload.message)
    }
  }

  const handleDeletePost=async()=>{
    const res=await dispatch(deletePost({id:url.id}))
    if(res.payload.success===true){
      toast.success(res.payload.message)

    }else{
      toast.error(res.payload.message)
    }
  }
  


  return (
    <div className="flex justify-center w-1/2 relative left-1/3 mb-2">
      <ToastContainer position='top-right' autoClose={3000}/>
      
      <div
        data-mdb-input-init=""
        className="form-outline flex flex-col gap-2"
        data-mdb-input-initialized="true"
      >
        <h1>Post Details</h1>
        <img src={post.image} class="img-fluid w-full" ></img>
        <br></br>
        <input type="text"  className="form-control" placeholder={post.title} ref={titleRef}/>
        
        <label
          className="form-label"
          style={{ marginLeft: "0px" }}
        >
          Title
        </label>
        <textarea rows={'4'} type="text"  className="form-control" placeholder={post.caption} ref={captionRef}/>
        <label
          className="form-label"
          style={{ marginLeft: "0px" }}
        >
          caption
        </label>
        <div className="form-notch">
          <div className="form-notch-leading" style={{ width: "9px" }}></div>
          <div className="form-notch-middle" style={{ width: "68.8px" }}></div>
          <div className="form-notch-trailing"></div>
        </div>
        <>
        {userStore.user?._id===post.uploadedBy ?
        <button className='btn btn-warning' onClick={handleEditPost}>Edit Post</button> : ''}
        {userStore.user?._id===post.uploadedBy ? <button className='btn btn-danger'  onClick={handleDeletePost}>Delete Post</button>:''}
        </>
      </div>
    </div>
  );
}

export default EditPage
