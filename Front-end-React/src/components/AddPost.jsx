import  { useState } from 'react'
import { useRef } from 'react'
import { createPost } from '../store/postsStore'
import { useDispatch } from 'react-redux'
import {ToastContainer,toast} from'react-toastify'
import { CgSpinner } from 'react-icons/cg'

const AddPost = () => {
  const formData=new FormData()
  const titleUseRef=useRef()
  const captionUseRef=useRef()
  const dispatch=useDispatch()
  const [isLoading,setIsLoading]=useState(false)

  const handleImageChange=(e)=>{
    for(let i=0; i<e.target.files.length;i++){
      formData.append('image',e.target.files[i])
    }
    console.log(e.target.files)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    formData.append("title",titleUseRef.current.value,)
    formData.append("caption",captionUseRef.current.value)
    setIsLoading(true)
    const res=await dispatch(createPost({formData}))
   
    if(res.payload.success===true){
      toast.success('post Added Successfully')
    }else{
      toast.error(res.payload.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="bd-example flex justify-center gap-4 ">
      <ToastContainer position='top-right' autoClose={3000}/>
      <div
        className="card text-dark bg-light mb-3 gap-2 "
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header">Add Post</div>
        <div className="card-body flex gap-10 flex-col">
          <form >
          <div
            data-mdb-input-init=""
            className="form-outline"
            data-mdb-input-initialized="true"
          >
            
            <label
              className="form-label"
              
              style={{ marginLeft: "0px" }}
            >
              title
            </label>
            <input type="text" ref={titleUseRef}  className="form-control" placeholder='Post Title' />

            <div
              data-mdb-input-init=""
              className="form-outline mb-4"
              data-mdb-input-initialized="true"
            >
                 <label
                className="form-label"
                
                style={{ marginLeft: "0px" }}
              >
                caption
              </label>
              <textarea
              placeholder='Caption'
                className="form-control"
                rows="2"
                ref={captionUseRef}
              ></textarea>
            </div>
            
          </div>
          
          <div>
          <label className="form-label">
            Choose an Image
          </label>
          <input type="file" className="form-control" accept='image/*'  multiple onChange={handleImageChange}/>
          </div>
          
           <div className="form-notch">    
              <div className="form-notch-trailing flex justify-center"><button className='btn btn-success' onClick={handleSubmit}>{isLoading ?<CgSpinner className='animate-spin'/>: "Create Post"}</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
}

export default AddPost
