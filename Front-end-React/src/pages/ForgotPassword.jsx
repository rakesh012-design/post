import React from 'react'
import {Form,Formik} from 'formik'
import {TextField,Button} from '@mui/material'
import * as Yup from 'yup'
import { IoSend } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../store/userStore'
import { useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { useState } from 'react'

const ForgotPassword = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [loading,setLoading]=useState(false)

  const initialState={
    email:''
  }
  const validationSchema=Yup.object({
    email:Yup.string().email('please enter valid email address').required('Email is required')
  })
  const submitHandler=async({email})=>{
    setLoading(true)
    const res=await dispatch(forgotPassword(email))
    setLoading(false)
    if(res.payload.success===true){
      navigate(`/verify-token`)
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="flex flex-col gap-3">
      <div className="container-fluid gap-3 flex flex-col bg-amber-50">
        <div className="col-12 gap-3 flex flex-col">
          <p className='text-2xl font-bold'>Forgot Password</p>
          <span className='text-s text-gray-500'>please enter your email</span>
        </div>
        <div className="col-12">
          <Formik onSubmit={submitHandler} validationSchema={validationSchema} initialValues={initialState}>
            {({handleBlur,handleChange,values,errors,touched})=>(
              <Form className='flex flex-col gap-3'>
                <div className="col-12">
                <TextField 
                label='Email'
                name='email'
                type='email'
                placeholder='Enter your registered email'
                fullWidth 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                size='small'
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                />
                </div>
                <div className="col-12">
                  <Button variant='contained' type='submit' fullWidth endIcon={<IoSend/>}>{loading ? <CgSpinner className='animate-spin'/> : 'SUBMIT'}</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ForgotPassword