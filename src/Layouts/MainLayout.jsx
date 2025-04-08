import React,{useState} from 'react';
import { Outlet } from 'react-router-dom';
import {Navbar,SideBar} from '../components/index';


const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex">
        {/* Sidebar */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1">
                {/* Navbar controls sidebar toggle */}
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main className="mt-16 p-4"> {/* mt-16 to offset fixed navbar */}
                        <Outlet context={{ sidebarOpen, setSidebarOpen }} />
                    </main>
            </div>
        </div>
    );
};

export default MainLayout;
