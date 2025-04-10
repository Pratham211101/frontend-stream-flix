import React, { useEffect, useState } from 'react'
import { getAllVideos } from '../services/video'
import { Link } from 'react-router-dom'

const RecommendedVideos = ({ excludeId }) => {
  const [videos, setVideos] = useState([])

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diff = Math.floor((now - posted) / 1000); // in seconds
  
    if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  };

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
    <Link
      to={`/video/${video._id}`}
      key={video._id}
      className="flex gap-3 hover:bg-gray-100 rounded-lg p-2 group"
    >
      <img
        src={video.thumbnail || '/default-thumbnail.jpg'}
        alt={video.title}
        className="w-60 h-36 object-cover rounded transform transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
        <p className="text-xs text-gray-500">{video.owner?.fullname || 'Unknown Channel'}</p>
        <p className="text-xs text-gray-500">
          {video.views} views •  {getTimeAgo(video.createdAt)}
        </p>
      </div>
    </Link>
  ))}
</div>

  )
}

export default RecommendedVideos
