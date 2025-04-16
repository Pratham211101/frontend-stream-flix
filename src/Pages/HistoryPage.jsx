import React from 'react';
import SideBar from '@/components/SideBar';
import History from '@/components/History';
import { useOutletContext } from 'react-router-dom';

const HistoryPage = () => {
  const { sidebarOpen } = useOutletContext();

  return (
    <div className="flex">
      <SideBar sidebarOpen={sidebarOpen} />
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : ''
        } w-full`}
      >
        <History />
      </main>
    </div>
  );
};

export default HistoryPage;