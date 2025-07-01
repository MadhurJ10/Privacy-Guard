import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import GetStartedButton from './GetStartedButton';
import logo from '../assets/logo.png';



const Nav = ({ toggleSlideBar }) => {
    const {isUserValid , setIsUserValid} = useContext(UserContext);
    
    const navigate = useNavigate();
    
    const Clicked = () => {
        navigate('/register')
    }
    return (
        <div className="flex justify-between w-full items-center text-black p-4 top-0 z-50 border-b">
            <div className='flex items-center gap-2'>
                <img src={logo} alt="" className='h-5'/>
            <Link to="/" className="font-semibold">
                Privacy Guard
            </Link>
            </div>
            <div className='flex flex-row gap-3'>
                <button
                    onClick={toggleSlideBar}
                    className="w-[2rem] cursor-pointer"><i className="ri-menu-fill text-[1.3rem]"></i>                </button>
                
                     {isUserValid && <h1 onClick={Clicked}>Profile</h1> }
                    {!isUserValid && <GetStartedButton/>}
            </div>
        </div>
    );
};

export default Nav;
