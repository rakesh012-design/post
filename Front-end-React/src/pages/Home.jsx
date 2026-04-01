import React, { useEffect, useState } from 'react'
import  {FaSpinner} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../store/postsStore'
import Post from '../components/Post'
import { useNavigate, useSearchParams} from 'react-router-dom'
import Pager from '../components/Pager'
import { toast,ToastContainer } from 'react-toastify'
import {socket} from '../store/socket'
import SkeletonPost from '../skeleton component/SkeletonPost'

const Home = () => {
  const store=useSelector((store)=>store.postStore)
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const [searchPageNum]=useSearchParams()
  const [isLoading,setIsLoading]=useState(true)
  const posts=store.posts 
 
  const urlPageNum=searchPageNum.get('pageNum')

  const [pageNum,setPageNum]=useState(urlPageNum)

  const handlePageChange=async(num)=>{
    setIsLoading(true)
    setPageNum(num)
    navigate(`/home?pageNum=${num}`)
    dispatch(getPosts(num))
    setIsLoading(false)
  }


  useEffect(()=>{
    
    const anFn=async()=> {
      setIsLoading(true)
      const res=await dispatch(getPosts(pageNum))
      if(res.payload.success===false){
        toast.error(res.payload.message)
      }
      setIsLoading(false)
    }
    anFn()
    
  },[])


  return (
    <>
    <ToastContainer position='top-center'/>
    <div className="grid md:grid-cols-1 lg:grid-cols-4 h-full m-0 gap-4 grid-cols-1">
      
      {posts?.length > 0 ? (
        posts.map((post, idx) => (
          <Post key={idx}
           post={post}
          />
        ))
      ) : (
        isLoading ? <SkeletonPost /> :<h1>No Posts</h1>
      )}
    
    </div>
    <Pager changePageNumber={handlePageChange} pageNum={pageNum}/>
    </>
  );
}

export default Home
