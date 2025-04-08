import React from 'react'
import SideBar from '@/components/SideBar'
import Feed from '@/components/feed'
import { useOutletContext } from 'react-router-dom';
const Home = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`transition-all duration-300 p-4 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Feed/>
      </div>
    </>
  )
}

export default Home