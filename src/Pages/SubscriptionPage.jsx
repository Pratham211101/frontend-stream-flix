import React from 'react';
import SideBar from '@/components/SideBar';
import Subscriptions from '@/components/Subscriptions';
import { useOutletContext } from 'react-router-dom';

const SubscriptionPage = () => {
  const { sidebarOpen } = useOutletContext();

  return (
    <div className="flex">
      <SideBar sidebarOpen={sidebarOpen} />
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : ''
        } w-full`}
      >
        <Subscriptions sidebarOpen={sidebarOpen} />
      </main>
    </div>
  );
};

export default SubscriptionPage;
