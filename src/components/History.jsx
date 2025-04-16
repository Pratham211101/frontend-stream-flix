import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/historyService';
import { Link } from 'react-router-dom';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  };
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getHistory();
        setVideos(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="mt-16 text-center">Loading videos...</p>;
  if (error) return <p className="mt-16 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 transition-all duration-300">
      <div
        className="grid gap-6 justify-items-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id}>
            <div className="w-[300px] transform transition-transform duration-300 hover:scale-105">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={video.thumbnail || '/default-thumbnail.jpg'}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-md font-semibold line-clamp-2 mt-2">{video.title}</h2>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                {video.owner?.fullname || 'Unknown Channel'}
              </h3>
              <p className="text-sm text-gray-500">
                {video.views} views • {getTimeAgo(video.createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default History;
