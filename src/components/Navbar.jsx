import { Bell, SearchIcon, MenuIcon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import logo from '../assets/streamflix-logo.png';
import { useSelector } from 'react-redux';
import { LogoutBtn, ProfileCard } from './index';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { searchVideosByTitle } from '../services/searchServices';
import { Alert } from '@mui/material';
import { X } from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [query, setQuery] = useState(''); // Holds the user's search input
  const [showProfileCard, setShowProfileCard] = useState(false); // Toggle for profile dropdown
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth?.userData;
  const navigate = useNavigate();

  // Handles search logic
  const handleSearch = async () => {
    if (!query.trim()) return; // Skip if input is empty
    try {
      const results = await searchVideosByTitle(query); 
      // Search videos by title
      if (results.length > 0) {
        navigate(`/video/${results[0]._id}`); // Navigate to the first matching video
      } else {
        console.log('No matching videos found');
        setErrorMessage('No matching videos found');
      }
    } catch (error) {
      console.error('Search failed:', error.message);
      setErrorMessage('Search failed: ' + error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  // Optional: handle "Enter" keypress to trigger search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white shadow-md'>
      
      {/* Logo & Sidebar Toggle */}
      <div className='flex items-center gap-4 relative'>
        <MenuIcon
          className="h-6 w-6 cursor-pointer relative z-20"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <img
          className='ml-8 h-8 cursor-pointer scale-350 relative z-10'
          src={logo}
          alt='logo'
          onClick={() => navigate('/')}
        />
      </div>

      {/* Search Input */}
      <div className='flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md'>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Allow enter key
          className='flex-1 outline-none bg-transparent text-gray-700'
        />
        <SearchIcon
          className="h-5 w-5 text-gray-500 cursor-pointer"
          onClick={handleSearch} // Click to search
        />
      </div>

      {errorMessage && (
        <div className="absolute top-16 left-0 w-full px-4">
          <Alert severity="error" icon={<X fontSize="inherit" />}>
            {errorMessage}
          </Alert>
        </div>
      )}

      {/* Right-side Controls */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <>
            <UploadIcon
              className='h-6 w-6 cursor-pointer text-gray-700'
              onClick={() => navigate('/upload-video')}
            />
            <Bell className='cursor-pointer text-gray-700' />
            <LogoutBtn />
            <img
              onClick={() => setShowProfileCard(prev => !prev)}
              src={isLoggedIn?.avatar}
              alt="user"
              className='rounded-full h-8 w-8 object-cover cursor-pointer'
            />
          </>
        )}
        {!isLoggedIn && (
          <Button
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: '999px',
              paddingX: 3,
              paddingY: 1,
              textTransform: 'none',
              backgroundColor: '#3b82f6',
              '&:hover': {
                backgroundColor: '#60a5fa',
              },
            }}
            variant="contained"
          >
            Login
          </Button>
        )}
      </div>

      {/* Profile Card Dropdown */}
      {showProfileCard && <ProfileCard onClose={() => setShowProfileCard(false)} />}
    </nav>
  );
};

export default Navbar;
