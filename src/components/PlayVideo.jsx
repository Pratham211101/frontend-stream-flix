import React from 'react'
import video1 from '../assets/video.mp4'
import jack from '../assets/jack.png'
import user_profile from '../assets/user_profile.jpg'
import { Download, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from './ui/button'

const PlayVideo = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
        {/* Video Player */}
        <video src={video1} controls autoPlay muted className="w-full rounded-lg shadow-md"/>
        {/* Video Actions */}
        <h3 className="mt-4 text-xl font-semibold"> Video 1</h3>
        <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600">1.2M views • 2 days ago</p>
            <div className="flex space-x-4">
                <Button className="gap-2 bg-gray-200 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition flex items-center cursor-pointer">
                    <ThumbsUp className=" w-5 h-5 text-gray-600" />
                     125
                </Button>
                <Button className="gap-2 bg-gray-200 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition flex items-center cursor-pointer">
                    <ThumbsDown className="w-5 h-5 text-gray-600"/>
                    50
                </Button>
                <Button className="gap-2 bg-gray-200 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition flex items-center cursor-pointer">
                    <Share2 className="w-5 h-5 text-gray-600"/>
                    Share
                </Button>
                <Button className="gap-2 bg-gray-200 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition flex items-center cursor-pointer">
                    <Download className="w-5 h-5 text-gray-600"/>
                    Download
                </Button>
            </div>
        </div>
        <hr className="my-4 border-gray-300"/>
        {/* Channel Info */}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={jack} alt="" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold">Channel1</p>
                <span className="text-sm text-gray-600">1M Subscribers</span>
              </div>
            </div>
            <Button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
              Subscribe
            </Button>
        </div>

        {/* Video Description */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">Channel that makes learning easy</p>
            <p className="text-gray-700">Subscribe for more</p>
        </div>
        <hr className="my-4 border-gray-300" />

        {/* Comments Section */}
        <h4 className="text-lg font-semibold">130 comments</h4>
        <div className="mt-4 flex space-x-4">
            <img src={user_profile} alt="" className="w-10 h-10 rounded-full" />
                <div>
                    <h3 className="font-semibold">Jack <span className="text-gray-500 text-sm">• 1 day ago</span></h3>
                    <p className="text-gray-700">Sample comment Lorem ipsum dolor sit amet consectetur adipisicingelit. Labore esse excepturi harum perspiciatis suscipit reprehenderit neque alias adipisci.</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <ThumbsUp className="w-4 h-4 text-gray-600 cursor-pointer" />
                        <span className="text-sm text-gray-600">244</span>
                        <ThumbsDown className="w-4 h-4 text-gray-600 cursor-pointer" />
                    </div>
                </div>
        </div>
    </div>  
  )
}

export default PlayVideo