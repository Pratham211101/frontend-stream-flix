import React from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../store/authSlice'
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import {logoutUser } from '../services/auth'
const LogoutBtn = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler=()=>{
        logoutUser()
        .then(()=>{
            dispatch(logout())
            navigate('/login')
        })
        
    }
  return (
    <Button 
      onClick={logoutHandler}
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
    >
    <FaPowerOff className='mr-2'/>  
    Logout</Button>
  )
}

export default LogoutBtn