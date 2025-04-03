import React from 'react'
import PlayVideo from '../components/PlayVideo'
import SideBar from '@/components/SideBar'
// import Recommended from '@/components/Recommended'
const Video = ({sidebar}) => {
  return (
    <>
    <SideBar sidebar={sidebar} />
    <div div className={`transition-all duration-300 p-4 ${sidebar ? "ml-64 w-[calc(100%-16rem)]" : "w-full"}`}>
        <PlayVideo/>
    </div>
    </>
  )
}

export default Video