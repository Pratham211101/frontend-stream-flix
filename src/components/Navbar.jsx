import {  Bell, SearchIcon, MenuIcon, MoreVerticalIcon, UploadIcon } from 'lucide-react'
import React from 'react'
import logo from '../assets/logo.png'
import profile_icon from '../assets/jack.png'

const Navbar = ({setSidebar}) => {
  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white shadow-md'>
        <div className='flex items-center gap-4'>
            <MenuIcon 
            className="h-6 w-6 cursor-pointer"
            onClick={() => setSidebar(prev => !prev)}
            />
            <img className='h-8 cursor-pointer' src={logo} alt='logo'/>
        </div>

        <div className='flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md'>
          <input type="text" placeholder="Search"
          className='flex-1 outline-none bg-transparent text-gray-700'/>
            <SearchIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
        </div>


        <div className="flex items-center gap-4">
          <UploadIcon className='h-6 w-6 cursor-pointer text-gray-700'/>
          <MoreVerticalIcon className='cursor-pointer text-gray-700'/>
          <Bell className='cursor-pointer text-gray-700'/>
          <img src={profile_icon} className='rounded-full h-8 cursor-pointer'/>
          
        </div>
    </nav>
 )
}

export default Navbar