import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../services/video'
import { Link } from 'react-router-dom'

const RecommendedVideos = ({ excludeId }) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos()
        setVideos(data.filter(video => video._id !== excludeId))
      } catch (error) {
        console.error('Error fetching recommended videos:', error)
      }
    }

    fetchVideos()
  }, [excludeId])

  return (
    <div className="flex flex-col gap-4">
      {videos.map((video) => (
        <Link to={`/video/${video._id}`} key={video._id} className="flex gap-3 hover:bg-gray-100 rounded-lg p-2">
          <img
            src={video.thumbnail || '/default-thumbnail.jpg'}
            alt={video.title}
            className="w-40 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
            <p className="text-xs text-gray-500">{video.owner?.fullname || 'Unknown Channel'}</p>
            <p className="text-xs text-gray-500">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RecommendedVideos
