import { CgSpinner } from 'react-icons/cg'
import Post from '../components/Post'
import { userFavourites} from '../hooks/userFavourite.js'

const UserFavouritePosts = () => {

  const [data,loading]=userFavourites()


  return (
    <div className='w-full h-full'>
       <div className="grid gap-4 grid-cols-4 h-full m-0">
        {loading ? <h1><CgSpinner className='animate-spin justify-center w-screen h-screen items-center'/></h1> :''}
        {data? data.map((p,idx)=><div key={idx}>{<Post key={idx} post={p}/>}</div>) : <h1>NO Posts</h1>}
       </div>
    </div>
  )
}

export default UserFavouritePosts