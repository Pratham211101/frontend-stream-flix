import { Separator } from '@radix-ui/react-separator'
import { CirclePlay, Clock9, GripHorizontal, History, Home, Library, ListVideo, Settings, ThumbsUp} from 'lucide-react'
import React from 'react'


const SideBar = ({sidebar}) => {
  return (
    <div className={`w-64 h-[calc(100vh-56px)] fixed top-[56px] left-0 bg-white text-black p-4  border-r border-gray-300 shadow-2xl transition-transform duration-300 ${sidebar ? "translate-x-0" : "-translate-x-64"}`}>
        <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Home className="w-6 h-6 text-gray-700"/>
                <p>Home</p>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <GripHorizontal className="w-6 h-6 text-gray-700"/><p>Subscriptions</p>
            </div>

            <Separator orientation="horizontal" className="w-full text-gray-700 border-1"  />

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <History className="w-6 h-6 text-gray-700"/><p>History</p>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <ListVideo className="w-6 h-6 text-gray-700"/><p>PLaylists</p>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <CirclePlay className="w-6 h-6 text-gray-700"/><p>Your videos</p>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Clock9 className="w-6 h-6 text-gray-700"/><p>Watch later</p>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <ThumbsUp className="w-6 h-6 text-gray-700"/><p>Liked videos</p>
            </div>

            <Separator orientation="horizontal" className="w-full text-gray-700 border-1"  />

            <div className=" flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Settings className=" w-6 h-6 text-gray-700 " /><p>Settings</p>
            </div>

        </div>
    </div>
  )
}

export default SideBar