import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { changePassword } from "../store/userStore"
import {ToastContainer,toast} from 'react-toastify'
import {FaEye,FaEyeSlash} from 'react-icons/fa'


const ChangePassword = () => {
  const oldPasswordRef=useRef()
  const newPasswordRef=useRef()
  const dispatch=useDispatch()


  const [newPasswordState,setNewPasswordState]=useState(false)
  const [oldPasswordState,setOldPasswordState]=useState(false)
  
  const handleNewPasswordState=()=>setNewPasswordState(!newPasswordState)
  const handleOldPasswordState=()=>setOldPasswordState(!oldPasswordState)

  const handleChangePassword=async()=>{
    const oldPassword=oldPasswordRef.current.value
    const newPassword=newPasswordRef.current.value

    const res=await dispatch(changePassword({oldPassword,newPassword})) 
    console.log('this is res',res.payload)
    
    if(res.payload.success===true){
      toast.success(res.payload.message)
    }else{
      toast.error(res.payload.message)
    }

  }

  return (
    <div className='flex justify-center'>
      <ToastContainer position="top-center" autoClose={3000}/>
    <div className='card w-1/2'>
    <div className="card-title flex justify-center" ><h1>Change Password</h1></div>
    <div class="mb-3">
    <label for="formGroupExampleInput" class="form-label">Old Password</label>
    <div className="flex items-center">
    <input type={oldPasswordState ? 'text' :'password'} class="form-control" ref={oldPasswordRef} placeholder="Enter Your Old Password"/>
    <button onClick={handleOldPasswordState}>{oldPasswordState ? <FaEye /> :<FaEyeSlash />}</button>
    </div>
  </div>
  <div class="mb-3">
    <label for="formGroupExampleInput2" class="form-label">New Password</label>
    <div className="flex items-center">
    <input type={newPasswordState ? 'text' :'password'} class="form-control" ref={newPasswordRef}  placeholder="Enter Your New Password"/>
    <button onClick={handleNewPasswordState}>{newPasswordState ? <FaEye /> :<FaEyeSlash />}</button>
    </div>
  </div>
  <div className="mb-3 flex justify-center">
    <button className='btn btn-primary' onClick={handleChangePassword}>Change Password </button>
  </div>
  </div>
  </div>
  )
}

export default ChangePassword
