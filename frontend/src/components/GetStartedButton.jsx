import React from 'react'
import { useNavigate } from 'react-router-dom'


const GetStartedButton = () => {
    const navigate = useNavigate();

  return (
    <div className=''>
      <button  onClick={() => navigate('/register')} className="bg-[#ADCBEA] hover:bg-[#89B4E0] text-black font-medium cursor-pointer px-4 py-1 rounded-3xl  transition duration-300">Get Started</button>
    </div>
  )
}

export default GetStartedButton
