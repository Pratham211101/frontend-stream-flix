import React, { useState, useEffect } from 'react';
import { X, Shuffle, ChevronUp, ChevronDown, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { getUserPlaylists } from '../services/playlist_service';
import { getVideoById } from '../services/video';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Playlists = ({ playlistId, onClose, currentVideoId }) => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoDetails, setVideoDetails] = useState({});
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log('playlistId:', playlistId);
    console.log('userData:', userData);
    const fetchUserPlaylist = async () => {
      try {
        setLoading(true);
        const playlists = await getUserPlaylists(userData.$id);
        const matched = playlists.find(p => p._id === playlistId);
        if (!matched) throw new Error('Playlist not found');
        setPlaylist(matched);
      } catch (err) {
        setError(err.message || 'Failed to load playlist');
      } finally {
        setLoading(false);
      }
    };

    if (playlistId && userData?.$id) {
      fetchUserPlaylist();
    }
  }, [playlistId, userData]);

  useEffect(() => {
    if (playlist?.videos?.length > 0) {
      const fetchVideoDetails = async () => {
        const detailMap = {};
        for (const videoId of playlist.videos) {
          try {
            const video = await getVideoById(videoId);
            detailMap[videoId] = video;
          } catch {
            detailMap[videoId] = null;
          }
        }
        setVideoDetails(detailMap);
      };

      fetchVideoDetails();
    }
  }, [playlist]);

  const handleRemoveVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist(playlistId, videoId);
      setPlaylist(prev => ({
        ...prev,
        videos: prev.videos.filter(id => id !== videoId)
      }));
    } catch (err) {
      console.error('Failed to remove video:', err);
    }
  };

  const handleVideoClick = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  if (loading) return <div className="p-4 text-center">Loading playlist...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md w-full h-full overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h3 className="text-lg font-semibold">{playlist.name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>{playlist?.owner?.fullname || playlist?.owner?.username}</span>
            <span className="mx-1">•</span>
            <span>{playlist.videos.length} videos</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center justify-between p-2 bg-gray-100">
        <Button variant="ghost" className="flex items-center gap-1 text-sm">
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
        <div className="flex items-center">
          <Button variant="ghost" size="sm"><ChevronUp className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><ChevronDown className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-220px)]">
        {playlist.videos.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            This playlist has no videos yet.
          </div>
        ) : (
          playlist.videos.map((videoId) => {
            const video = videoDetails[videoId];
            const isCurrent = videoId === currentVideoId;
            if (!video) return null;
            return (
              <div 
                key={videoId} 
                className={`flex gap-2 p-2 hover:bg-gray-100 cursor-pointer ${isCurrent ? 'bg-gray-100' : ''}`}
                onClick={() => handleVideoClick(videoId)}
              >
                <div className="relative">
                  <span className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                    {new Date(video.duration * 1000).toISOString().substr(14, 5)}
                  </span>
                  <img src={video.thumbnail} alt={video.title} className="w-28 h-16 object-cover rounded" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                  <p className="text-xs text-gray-600">{video.owner?.fullname || video.owner?.username}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="self-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVideo(videoId);
                  }}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Playlists;
