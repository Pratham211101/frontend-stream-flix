import React from 'react'
import SideBar from '@/components/SideBar'
import Feed from '@/components/feed'
const Home = ({sidebar}) => {
  return (
    <>
      <SideBar sidebar={sidebar} />
      <div className={`transition-all duration-300 p-4 ${sidebar ? "ml-64 w-[calc(100%-16rem)]" : "w-full"}`}>
        <Feed/>
      </div>
    </>
  )
}

export default Home