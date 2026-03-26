

export const login=async({email,password})=>{
  const res=await fetch('http://localhost:3000/api/random/login',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  })
  const data=res.json()
  return data

}

export const fetchImages=async()=>{
  console.log('in fetchImages')
  const res=await fetch('http://localhost:3000/api/random/image/get',{
    method:"GET",
    credentials:'include',
    headers:{
      "Content-Type":"application/json",
    }
  })
  const data=res.json()
  return data
}