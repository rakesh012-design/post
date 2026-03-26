import React from 'react'
import { fetchAllPosts, getPosts } from '../store/postsStore'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Post from './Post'
import Pager from './Pager'
import { useState } from 'react'
import { useEffect } from 'react'
import {FaSpinner} from 'react-icons/fa'
import {socketEvents} from '../store/socket'

const AllPosts = () => {
  const store=useSelector((store)=>store.postStore)
  const dispatch=useDispatch()
  const [searchParams]=useSearchParams()
  const navigate=useNavigate()
  const urlPageNum=searchParams.get('pageNum')
  
  const [pageNum,setPageNum]=useState(urlPageNum) 
  const handleChangePage=(num)=>{
    setPageNum(num)
    navigate(`/home/allposts?pageNum=${num}`)
    dispatch(fetchAllPosts(num))
  }

  useEffect(()=>{
    dispatch(fetchAllPosts(pageNum))
  },[])
  const posts=store.allPosts
  return (
    <div className="grid gap-4 grid-cols-4 h-full m-0">
    {
    posts.length>0 ? posts.map((post,idx)=><Post key={idx} post={post}/>) : <h1><FaSpinner className='animate-spin'/></h1>}
    <Pager changePageNumber={handleChangePage} pageNum={pageNum}/>
    </div>
  )
}

export default AllPosts
