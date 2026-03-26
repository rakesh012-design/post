import { useDispatch, useSelector } from 'react-redux'
import {ToastContainer,toast} from 'react-toastify'
import { editUser } from '../store/userStore'
import { useRef } from 'react'

const EditProfile = () => {
  const dispatch=useDispatch()
  const newUserNameRef=useRef()
  const newEmailRef=useRef()
  const store=useSelector((store)=>store.userStore)
  const user=store.user
  const handleEditProfile=async()=>{
    const newUserName=newUserNameRef.current.value
    const newEmail=newEmailRef.current.value
    const res=await dispatch(editUser({newUserName,newEmail}))
    console.log(res.payload)
    if(res.payload.success===true){
      toast.success(res.payload.message)
    }else{
      toast.error(res.payload.error)
    }
  }

  return (
    <div className="flex justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="card w-1/2">
        <div className="card-title flex justify-center">
          <h1>Edit Profile</h1>
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Email
          </label>
          <input type="email" className="form-control" placeholder={user?.email} ref={newEmailRef} />
        </div>
         <div className="mb-3">
          <label  className="form-label">
           User Name
          </label>
          <input type="text" className="form-control" placeholder={user?.userName} ref={newUserNameRef}/>
        </div>
        <div className="mb-3 flex justify-center">
          <button className="btn btn-primary" onClick={handleEditProfile} >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile
