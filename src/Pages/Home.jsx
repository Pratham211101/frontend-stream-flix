import React from 'react';
import SideBar from '@/components/SideBar';
import Feed from '@/components/feed';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { sidebarOpen } = useOutletContext();

  return (
    <div className="flex">
      <SideBar sidebarOpen={sidebarOpen} />
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        } w-full`}
      >
        <Feed sidebarOpen={sidebarOpen} />
      </main>
    </div>
  );
};

export default Home;
