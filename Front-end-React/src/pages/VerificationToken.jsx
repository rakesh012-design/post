import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import *  as Yup from 'yup'
import {Form,Formik} from 'formik'
import { useDispatch } from 'react-redux';
import {ToastContainer,toast} from 'react-toastify'
import { verifyTokenPassword } from '../store/userStore';

const VerificationToken = () => {
  const dispatch=useDispatch()

  const validationSchema=Yup.object({
    VerificationToken:Yup.string().required('Verification Token is Required')
  })
  const initialState={
    VerificationToken:''
  }
  const handleOnsubmit=async({VerificationToken})=>{
    const res=await dispatch(verifyTokenPassword(VerificationToken))
    console.log(res)
    if(res.payload.success===true){
      toast.success(res.payload.message)
    }else{
      toast.error(res.payload.message)
    }
  }
  
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg flex flex-col gap-3">
        <ToastContainer position='top-center' autoClose={3000}/>
        <div className="col-12">
          <p className='text-2xl font-bold'>Verification Token</p>
          <span className='text-s text-gray-500'>Please Enter the verification token</span>
        </div>
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleOnsubmit}>
          {({values,errors,touched,handleChange,handleBlur})=>(
          <Form className='flex flex-col gap-3'>
        <div className="col-12">
        <TextField
          type="text"
          name='VerificationToken'
          label="Verification Token"
          fullWidth
          size="small"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.VerificationToken) && touched.VerificationToken}
          helperText={touched.VerificationToken && errors.VerificationToken}
          
        />
        </div>
        <div className="col-12">
          <Button variant='contained' fullWidth type='submit'>SUBMIT</Button>
        </div>
        </Form>
          )}
        
        
        </Formik>
      </div>
    </div>
  );
}

export default VerificationToken