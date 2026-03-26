import React, { useRef, useState } from 'react'
import { checkStatus, googleLoginFunction, login } from '../store/userStore'
import {useNavigate,Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {GoogleLogin} from '@react-oauth/google'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {ToastContainer,toast} from 'react-toastify'





const Login = () => {
  const emailRef=useRef()
  const passwordRef=useRef()
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const [showPassword,setShowPassword]=useState(false)

  const changePasswordState=()=>{
    setShowPassword(!showPassword)
  }


  useEffect(()=>{
    const checkStatus_=async()=>{
      const res=await dispatch(checkStatus())
      if(res.payload.success===true){
        navigate('/home')
      }
    }
    checkStatus_()
  },[])

  const loginUser=async()=>{
    const email=emailRef.current.value
    const password=passwordRef.current.value
    const res=await dispatch(login({email,password}))
    if(res.payload.success){
      navigate('/home?pageNum=1')
    }
    else{
      toast.error(res.payload.message)
    }
   
  }

 



  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'>
      <ToastContainer position='top-center' autoClose={3000}/>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              ref={emailRef}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className='flex items-center'>
              <input
                type={showPassword ? 'text': 'password'}
                ref={passwordRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter your password"
              />
              {showPassword ? <FaEye onClick={changePasswordState}/> : <FaEyeSlash onClick={changePasswordState}/>}
            </div>
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            onClick={loginUser}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            Sign In
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin 
              onSuccess={async(cr)=>{
                const res=await dispatch(googleLoginFunction(cr))
                if(res.payload.success===true){
                  navigate('/home')
                }
              }} 
              onError={async(cr)=>{
                await dispatch(googleLoginFunction(cr))
              }}
            />
          </div>
        </div>

        <div className='text-center mt-6 pt-6 border-t border-gray-200'>
          <p className="text-gray-600">Don't have an account? 
            <Link to={'/signup'} className="ml-1 font-semibold text-indigo-600 hover:text-indigo-700">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
