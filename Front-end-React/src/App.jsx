import Home from "./pages/Home"
import Login from "./pages/Login"
import {BrowserRouter,Route,Routes, useLocation} from'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Header from "./components/Header"
import AddPost from "./components/AddPost"
import AllPosts from "./components/AllPosts"
import EditPage from "./pages/EditPage"
import Signup from "./pages/Signup"
import VerifyUser from "./pages/VerifyUser"
import ChangePassword from "./pages/ChangePassword"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import ForgotPassword from "./pages/ForgotPassword"
import VerificationToken from "./pages/VerificationToken"
import UserFavouritePosts from "./pages/UserFavouritePosts"
import UserPage from "./pages/UserPage"
import Followers from "./pages/UserPages/Followers"
import Following from "./pages/UserPages/Following"
import Messages from "./pages/UserPages/Messages"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/verify-user" element={<VerifyUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/> 
      <Route path="/verify-token" element={<VerificationToken />} />
      <Route path="/home" element={<Header/>}>
        <Route index element={<Home />}/>
        <Route path="addpost" element={<AddPost />}/>
        <Route path="allposts"  element={<AllPosts />}/>
        <Route path="user/:id" element={<UserPage />}/>
        <Route path='edit-post/:id' element={<EditPage />}/>
        <Route path="messages" element={<Messages />}/>
        <Route path="change-password" element={<ChangePassword />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="edit-profile" element={<EditProfile />}/>
        <Route path="user-favourites" element={<UserFavouritePosts />} />
        <Route path="user/:id/followers" element={<Followers />}/>
        <Route path="user/:id/following" element={<Following />}/>
      </Route>
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
