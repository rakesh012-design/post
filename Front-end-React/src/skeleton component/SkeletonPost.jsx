import {CgProfile} from 'react-icons/cg'
import {FaBookmark} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import {Button} from '@mui/material'

const SkeletonPost=()=>{
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="p-4 border-b border-gray-200 ">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
            <CgProfile size={20}/>
          </div>
          <span className="font-semibold text-gray-800"></span>
        </div>
      </div>

     
      <div 
        className="w-full h-48 bg-gray-200 cursor-pointer hover:opacity-90 transition overflow-hidden">
      </div>

      {/* Post Content */}
      <div className="p-4" >
        <h5 className="font-bold text-gray-800 text-lg mb-2 hover:cursor-pointer" ></h5>
        <p className="text-gray-600 text-sm mb-4"></p>

        {/* Likes Section */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center gap-2 mb-3">
            <button className="flex items-center gap-2 text-lg transition hover:scale-110">
              <AiFillHeart 
                size={24}
              />
              <span className="text-sm font-semibold text-gray-700"></span>
            </button>
          </div>
          <div className='flex w-3/4'>
            <p className='text-xs'></p>
          
          </div>
          
        </div>
        <div className='relative float-end'><Button color='none' onClick={()=>handleAddToFavourites(post._id)}>
       <FaBookmark size={25}/></Button> </div>
      </div>
    </div>
  )
}

export default SkeletonPost