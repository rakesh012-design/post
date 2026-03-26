import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"



const backEndUrl=process.env.NODE_ENV==='production' ? '' :'http://localhost:3000'
console.log(backEndUrl,'this is backend url')

export const getUserHook=()=>{
  const url=useLocation().pathname.split('/')
  const userId=url[url.length-2]
  const [followers,setFollowers]=useState()
  const[following,setUserFollowing]=useState()
  

  const getUserFollowers=async()=>{ 
    const res=await fetch(`${url}/api/random/get-user-followers/${userId}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    setFollowers(data.followers)
    return data
  }
  const getUserFollowing=async()=>{
    const res=await fetch(`${url}/api/random/get-user-following/${userId}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    console.log(data)
    setUserFollowing(data.following)
    return data
  }

  useEffect(()=>{
    const anFn=async()=>{
      await getUserFollowers()
      await getUserFollowing()
    }
    anFn()
  },[userId])


  return {getUserFollowers,followers,following}

}