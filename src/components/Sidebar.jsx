import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {logo} from '../assets'
import {navlinks} from '../constants'

const Icon = ({ styles, name, imgUrl, isActive, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive===name && 'bg-[#2c2f32]'} flex justify-center items-center cursor-pointer ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="vote_logo" className='w-1/2 h-1/2' />
    ) : (
      <img src={imgUrl} alt='vote_logo' className={`w-1/2 h-1/2 ${isActive != name && 'grayscale'}`}/>
    )}
  </div>
)

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  
  return (
    // Change this height later
    <div className='flex justify-between items-center flex-col sticky top-5 h-[41vh]'>
      {/* Logo icon */}
      <Link to="/">
        <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo}/>
      </Link>

      {/* Rest of the options */}
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link)=>(
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={()=>{
                  setIsActive(link.name);
                  navigate(link.link);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
