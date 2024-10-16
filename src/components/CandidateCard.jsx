import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'

const CandidateCard = ({name, description, handleClick, image}) => {
    const navigate = useNavigate()
    const handleCandidateClick = (candidate) => {
        navigate(`/candidate-details/${candidate.name}`, {state: candidate})
    }

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img source={image} alt='name' className='w-full h-[158px] object-cover rounded-[15px]'/>
      <div className='flex flex-col p-4'>
        <div className='block'>
            <h3></h3>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
