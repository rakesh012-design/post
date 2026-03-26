import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userStore";
import postSlice from "./postsStore";



const store=configureStore({
  reducer:{
    userStore:userSlice.reducer,
    postStore:postSlice.reducer
  }
  
})

export default store