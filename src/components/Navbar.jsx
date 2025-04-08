import {  Bell, SearchIcon, MenuIcon, MoreVerticalIcon, UploadIcon } from 'lucide-react'
import React from 'react'
import logo from '../assets/streamflix-logo.png'
// import profile_icon from '../assets/jack.png'
import { useSelector } from 'react-redux';
import {LogoutBtn,ProfileCard} from './index';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SideBar } from './index';


const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const auth = useSelector((state) => state.auth); // assuming your user is stored here
  const isLoggedIn = auth?.userData;
  const navigate = useNavigate()
  const [showProfileCard, setShowProfileCard] = useState(false);
  return (
    
    <nav className='fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white shadow-md'>
        <div className='flex items-center gap-4 relative'>
            <MenuIcon 
            className="h-6 w-6 cursor-pointer relative z-20"
            onClick={() =>setSidebarOpen(!sidebarOpen)}
            />
            <img className='ml-8 h-8 cursor-pointer scale-350 relative z-10' src={logo} alt='logo' onClick={()=>navigate('/')}/>
        </div>

        <div className='flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md'>
          <input type="text" placeholder="Search"
          className='flex-1 outline-none bg-transparent text-gray-700'/>
            <SearchIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
        </div>


        <div className="flex items-center gap-4">
          {isLoggedIn && <UploadIcon className='h-6 w-6 cursor-pointer text-gray-700' onClick={() => navigate('/upload-video')}/>}
          {/* <MoreVerticalIcon className='cursor-pointer text-gray-700'/> */}
          {isLoggedIn && <Bell className='cursor-pointer text-gray-700'/>}
          {isLoggedIn && <LogoutBtn />}
          {isLoggedIn && <img
          onClick={() => setShowProfileCard(prev => !prev)}
          src={isLoggedIn?.avatar}
          alt="user"
          className='rounded-full h-8 w-8 object-cover cursor-pointer'
          />}
          {!isLoggedIn && <Button 
                onClick={() => navigate('/login')}
                sx={{
                  borderRadius: '999px',        // full pill shape
                  paddingX: 3,                  // px-6 equivalent
                  paddingY: 1,                  // py-2 equivalent
                  textTransform: 'none',        // normal-case
                  backgroundColor: '#3b82f6',   // tailwind blue-500
                  '&:hover': {
                    backgroundColor: '#60a5fa', // tailwind blue-400
                  },
                }}
                variant="contained"
          >Login</Button>}
          
        </div>
        {showProfileCard && <ProfileCard onClose={() => setShowProfileCard(false)} />}
    </nav>
 )
}

export default Navbar