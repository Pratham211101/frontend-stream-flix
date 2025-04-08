import React from 'react'
import PlayVideo from '../components/PlayVideo'
import SideBar from '@/components/SideBar'
import { useOutletContext } from 'react-router-dom';

const Video = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  return (
    <>
    <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <div div className={`flex flex-col lg:flex-row gap-6 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64 w-[calc(100%-16rem)]' : 'w-full'}`}>
        <PlayVideo/>
    </div>
    </>
  )
}

export default Video