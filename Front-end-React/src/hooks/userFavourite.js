import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getUserFavourites} from '../store/userStore'


export const userFavourites=()=>{
  const dispatch=useDispatch()
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  
  const fetchFavs=async()=>{
    setLoading(true)
    try {
      const res=await dispatch(getUserFavourites())
      setData(res.payload.userFavourites || [])
    } catch (error) {
      console.log(error) 
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{fetchFavs()},[])

  return [data,loading]

}