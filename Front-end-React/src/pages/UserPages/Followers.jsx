import {getUserHook}  from '../../hooks/usegetUserInfo'

const Followers = () => {
  const {followers}=getUserHook()
  console.log(followers)
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-3'>
        {followers?.length>0 ? followers.map((follower)=>(
          <div className='flex gap-3' style={{border:'2px solid gray', padding:'4px', borderRadius:'5px'}}>
          <div className='flex flex-col'>
            <h5>{follower.userName}</h5>
            <h5>{follower.email}</h5>
          </div>
          <img src={follower.profilePic? follower.profilePic : 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'} width={50} height={50} style={{borderRadius:'20%'}}/>
          </div>
      )) :<h1>user has no followers</h1>}
      </div>
      </div>
  )
}

export default Followers