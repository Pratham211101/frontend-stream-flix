import React,{useEffect} from 'react'
import PlayVideo from '../components/PlayVideo'
import SideBar from '@/components/SideBar'
import { useOutletContext ,useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addtoHistory } from '@/services/historyService';
const Video = () => {
  const auth=useSelector((state) => state.auth);
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  const { id } = useParams();
  
  useEffect(() => {
    if (auth?.status && id) {
      addtoHistory(id).catch((err) =>
        console.error("Failed to add video to watch history", err)
      );
    }
  }, [auth?.status, id]);

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