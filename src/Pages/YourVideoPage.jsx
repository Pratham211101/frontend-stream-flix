import React from 'react';
import SideBar from '@/components/SideBar';
import YourVideos from '@/components/YourVideos';
import { useOutletContext } from 'react-router-dom';

const YourVideosPage = () => {
  const { sidebarOpen } = useOutletContext();

  return (
    <div className="flex">
      <SideBar sidebarOpen={sidebarOpen} />
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : ''
        } w-full`}
      >
        <YourVideos />
      </main>
    </div>
  );
};

export default YourVideosPage;