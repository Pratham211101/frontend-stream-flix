import React, { useEffect, useState } from 'react';
import { getAllVideos } from '../services/video';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
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
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {videos.map((video) => (
        <Link to={`/video/${video._id}`} key={video._id}>
          <div className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src={video.thumbnail || '/default-thumbnail.jpg'}
              alt={video.title}
              className="shadow-2xl rounded-sm w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold line-clamp-2 mt-2">{video.title}</h2>
            <h3 className="text-sm text-gray-600 dark:text-gray-400">{video.owner?.fullname || 'Unknown Channel'}</h3>
            <p className="text-sm text-gray-500">
              {video.views} views &bull; {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
