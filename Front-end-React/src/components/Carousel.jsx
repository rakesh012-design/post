import  { useState } from 'react'
import {FaArrowAltCircleLeft,FaArrowAltCircleRight} from 'react-icons/fa'

const Carousel = ({images}) => {

  const [currentIndex,setCurrentIndex]=useState(0)

  const nextSlide=()=>{
    setCurrentIndex((prev)=>prev===images.length-1 ? 0 : prev+1)
  }
  const prevSlide=()=>{
    setCurrentIndex((prev)=>prev===0 ? images.length-1 : prev-1)
  }

  return (
    <div className='relative w-full flex flex-col h-full'>
      <img src={images[currentIndex]} alt='carousel' className='w-full h-full object-cover'/>
      <button onClick={prevSlide} className='absolute left-0 bottom-0'><FaArrowAltCircleLeft size={20}/></button>
      <button onClick={nextSlide} className='absolute right-0 bottom-0'><FaArrowAltCircleRight size={20}/></button>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }} className='bg-gray'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#333' : '#ccc', // Active vs Inactive
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel