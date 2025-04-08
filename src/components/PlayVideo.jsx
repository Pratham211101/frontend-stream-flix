import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../services/video'
import { Download, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from './ui/button'

const PlayVideo = () => {
  const { id } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(id)
        setVideo(data)
      } catch (error) {
        console.error('Error fetching video:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])
  console.log(id);
  

  if (loading) return <p className="text-center mt-10">Loading video...</p>
  if (!video) return <p className="text-center mt-10 text-red-500">Video not found.</p>

  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      <video
        src={video.videoFile}
        controls
        autoPlay
        className="w-full rounded-lg shadow-md"
      />

      <h3 className="mt-4 text-xl font-semibold">{video.title}</h3>

      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-600">
          {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>
        <div className="flex space-x-4">
          <Button className="gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center">
            <ThumbsUp className="w-5 h-5 text-gray-600" />
            125
          </Button>
          <Button className="gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center">
            <ThumbsDown className="w-5 h-5 text-gray-600" />
            50
          </Button>
          <Button className="gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center">
            <Share2 className="w-5 h-5 text-gray-600" />
            Share
          </Button>
          <Button className="gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center">
            <Download className="w-5 h-5 text-gray-600" />
            Download
          </Button>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={video.owner.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-semibold">{video.owner.fullname}</p>
            <span className="text-sm text-gray-600">@{video.owner.username}</span>
          </div>
        </div>
        <Button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
          Subscribe
        </Button>
      </div>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700">{video.description}</p>
      </div>
    </div>
  )
}

export default PlayVideo
