import { createSlice,createAsyncThunk,current } from "@reduxjs/toolkit";


const backendurl=process.env.NODE_ENV==='production' ? '' :'http://localhost:3000'
console.log(process.env.NODE_ENV,'this is node env')

export const signupUser=createAsyncThunk('signupUser',
  async({userName,email,password})=>{
    const res=await fetch(`${backendurl}/api/random/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({userName,email,password})
    })
    const data=await res.json()
    return data
  }
)

export const verifyUser=createAsyncThunk('verifyUser',
  async({verificationCode})=>{
    const res=await fetch(`${backendurl}/api/random/verify-user`,{
      method:"POST",
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({verificationCode})
    })
    const data=await res.json()
    return data
  }
)

export const login=createAsyncThunk('loginUser',async({email,password})=>{
  try {
    const res=await fetch(`${backendurl}/api/random/login`,{
      method:"POST",
      credentials:'include',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    const data=await res.json()
    return data
  } catch (error) {
    console.log('error while loggin in ')
    return {success:false,message:error.message}
  }
})

export const fetchUser=createAsyncThunk('fetchUser',async()=>{
try {
    const res=await fetch(`${backendurl}/api/random/fetch-user/me`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    console.log('user fetched successfully')
    return data
} catch (error) {
  console.log(error,'error while fetching user')
  return {success:false,message:e.message}
}
})

export const logoutUser=createAsyncThunk('logoutUser',
  async()=>{
    const res=await fetch(`${backendurl}/api/random/logout`,{
      method:"POST",
      credentials:"include"
    })
    const data=await res.json()
    return data
})

export const googleLoginFunction=createAsyncThunk('googleLogin',
  async(res)=>{
    try{
    const response=await fetch(`${backendurl}/api/random/google-login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/Json"
      },
      credentials:'include',
      body:JSON.stringify({googleToken:res.credential})
    })
    const data=await response.json()
    return data
  }catch(e){
    console.log('error from FN',e)
  }
  }
)



export const checkStatus=createAsyncThunk('checkStatus',
  async()=>{
    try {
      console.log('in check status')
      const res=await fetch(`${backendurl}/api/random/check`,{
        method:"GET",
        credentials:"include"
      })
      const data=await res.json()
      return data
    } catch (error) {
      console.log('checkStaus error',error.message)
      return {success:false,message:error.message}
    }
  }
)

export const changePassword=createAsyncThunk('changePassword',
  async({oldPassword,newPassword})=>{

    const res=await fetch(`${backendurl}/api/random/change-password`,{
      credentials:'include',
      method:'POST',
      headers:{"Content-Type":"application/Json"},
      body:JSON.stringify({oldPassword:oldPassword,newPassword:newPassword})
    })
    console.log('res from change password',res)
    const data=await res.json()
    return data
    
  }
)

export const editUser=createAsyncThunk('editUser',
  async({newUserName,newEmail})=>{
    const res=await fetch(`${backendurl}/api/random/edit-user`,{
      method:"PATCH",
      credentials:"include",
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({newUserName,newEmail})
    })
    const data=await res.json()
    return data
  }
)

export const uploadProfilePicture=createAsyncThunk('upload profile picture',
  async(formdata)=>{
    const res=await fetch(`${backendurl}/api/random/upload/profile-picture`,{
      method:"POST",
      credentials:'include',
      body:formdata
    })
   const data=res.json()
   return data 
  }
)

export const forgotPassword=createAsyncThunk('forgot password',
  async(email)=>{
    const res=await fetch(`${backendurl}/api/random/forgot-password`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    })
    const data=await res.json()
    return data
  })

export const verifyTokenPassword=createAsyncThunk('verifyPasswordToken',
  async(verificationToken)=>{
    const res=await fetch(`${backendurl}/api/random/verify/forgot-passowrd`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({verificationToken})
    })
    const data=res.json()
    return data
  }
  
)

export const addPostToFavourites=createAsyncThunk('addPostToFavourites',
  async(postId)=>{
    const res=await fetch(`${backendurl}/api/random/post/add-post-to-favourites/${postId}`,{
      method:"GET",
      credentials:"include"
    })
    const data=res.json()
    return data
  }
)

export const getUserFavourites=createAsyncThunk('getUserFavourites',
  async()=>{
    const res=await fetch(`${backendurl}/api/random/post/get-user-favourites`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    return data
  }
)
const userSlice=createSlice({
  name:'userSlice',
  initialState:{
    user:{}
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(login.fulfilled,(state,action)=>{
      state.user=action.payload.user
    })
    builder.addCase(fetchUser.fulfilled,(state,action)=>{
      state.user=action.payload.user
    })
 
    builder.addCase(googleLoginFunction.fulfilled,(state,action)=>{
    })
  
    builder.addCase(uploadProfilePicture.fulfilled,(state,action)=>{
      state.user.profilePic=action.payload.profilePic
    })
    builder.addCase(editUser.fulfilled,(state,action)=>{
      state.user.userName=action.payload.user.userName
      state.user.email=action.payload.user.email
    })
    builder.addCase(addPostToFavourites.fulfilled,(state,action)=>{
      state.user.FavouritePosts=action.payload.userFavourites
    })
  }
})


export default userSlice