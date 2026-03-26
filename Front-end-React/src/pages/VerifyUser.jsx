import React from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { verifyUser } from '../store/userStore';
import { ToastContainer,toast } from 'react-toastify';

const VerifyUser = () => {
  const dispatch=useDispatch()
  const codRef=useRef()

  const handleVerify=async(e)=>{
    e.preventDefault()
    const verificationCode=codRef.current.value
    const res=await dispatch(verifyUser({verificationCode}))
    console.log(res,'this is payload from component')
    if(res.payload.success){
      toast.success(res.payload.message)
    }
    else{
      toast.error(res.payload.message)
    }
  }

  return (
    <div className='flex justify-center w-full h-screen items-center flex-col'>
      <ToastContainer position='top-right' autoClose={5000}/>
      <h1>Please Enter your Verification Code</h1>
      <form class="form-inline mt-10">
        <div class="form-group">
          <input
          type='text'
            class="form-control mx-sm-3"
            ref={codRef}
          />
        </div>
         <div class="form-group flex justify-center mt-4">
          <button className='btn btn-primary' onClick={handleVerify}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default VerifyUser
