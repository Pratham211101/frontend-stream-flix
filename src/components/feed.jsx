import React, { useEffect, useState } from 'react';
import { getAllVideos } from '../services/video';
import { Link } from 'react-router-dom';

const Feed = ({ sidebarOpen }) => {
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
    <div className="p-4 transition-all duration-300">
      <div
        className="grid gap-6 justify-items-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id}>
            <div className="w-[300px]">
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
                {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;
