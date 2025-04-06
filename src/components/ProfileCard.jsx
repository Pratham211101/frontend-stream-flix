import React, { useEffect, useState } from 'react';
import { getChannelStats } from '../services/dashboard';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

const ProfileCard = ({ onClose }) => {
  const user = useSelector((state) => state.auth?.userData);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getChannelStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching channel stats:', err.message);
      }
    };
    fetchStats();
  }, []);

  if (!user) return null;

  return (
    <div className="absolute top-16 right-4 w-[300px] rounded-xl shadow-lg bg-white z-50 overflow-hidden p-4">
      <div className="relative h-[100px]">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover rounded-xl"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
        >
          <X size={18} />
        </button>
        <img
          src={user.avatar}
          alt="Avatar"
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-16 h-16 rounded-full border-4 border-white object-cover"
        />
      </div>

      <div className="pt-10 pb-4 text-center">
        <h3 className="font-semibold text-lg">{user.fullname}</h3>
        <p className="text-gray-500 text-sm">@{user.username}</p>

        {stats ? (
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700 px-4">
            <div className="text-center">
              <p className="font-bold">{stats.totalVideos}</p>
              <p>Videos</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{stats.totalSubscribers}</p>
              <p>Subs</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{stats.totalLikes}</p>
              <p>Likes</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{stats.totalViewsCount}</p>
              <p>Views</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mt-4">Loading stats...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
