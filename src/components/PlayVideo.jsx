import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../services/video'
import { Download, Share2, ThumbsUp } from 'lucide-react'
import { Button } from './ui/button'
import Recommended from './Recommended'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import ShareModal from './ShareModal'
import CommentsSection from './CommentsSection'

const PlayVideo = () => {
  const { id } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscribers, setSubscribers] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [showShare, setShowShare] = useState(false)
  const auth = useSelector((state) => state.auth)
  const { userData } = auth

  const getDownloadUrl = (cloudinaryUrl) => {
    // Inject `fl_attachment` transformation
    return cloudinaryUrl.replace('/upload/', '/upload/fl_attachment/');
  };

  const handleDownload = () => {
    const downloadUrl = video.videoFile.replace('/upload/', '/upload/fl_attachment/');
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'video.mp4');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diff = Math.floor((now - posted) / 1000);
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

  const handleSubscribe = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/subscriptions/c/${video.owner._id}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.message.includes('Unsubscribed')) {
        setIsSubscribed(false)
        setSubscribers(prev => prev - 1)
      } else {
        setIsSubscribed(true)
        setSubscribers(prev => prev + 1)
      }
    } catch (err) {
      console.error('Error subscribing:', err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/likes/toggle/v/${id}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();

      // Check if the backend sent new like status and count (recommended)
      if (data.data?.liked !== undefined) {
        setLiked(data.data.liked);
      } else {
        setLiked((prev) => !prev); // fallback
      }

      if (data.data?.count !== undefined) {
        setLikesCount(data.data.count);
      } else {
        setLikesCount((prev) => (data.message.includes('unliked') ? Math.max(prev - 1, 0) : prev + 1));
      }

      toast.success(data.message);
    } catch (err) {
      console.error('Error toggling like:', err);
      toast.error('Something went wrong');
    }
  };

  const hasLoggedViewRef = useRef(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(id);
        setVideo(data);

        // Check like status
        const likeStatusRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/likes/check/v/${id}`, {
          credentials: 'include',
        });
        const likeStatusData = await likeStatusRes.json();
        setLiked(likeStatusData.data.liked);

        // Fetch like count
        const likeRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/likes/count/v/${id}`, {
          credentials: 'include'
        });
        const likeData = await likeRes.json();
        setLikesCount(likeData.data.count);

        // Fetch subscriber count
        const subRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/subscriptions/c/${data.owner._id}`, {
          credentials: 'include'
        })
        const subData = await subRes.json()
        setSubscribers(Number(subData.data.subscribersCount) || 0);
        setIsSubscribed(subData.data.isSubscribed || false)
      } catch (error) {
        console.error('Error fetching video:', error)
      } finally {
        setLoading(false)
      }
    };

    const logView = async () => {
      if (!hasLoggedViewRef.current) {
        hasLoggedViewRef.current = true;
        try {
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}/view`, {
            method: 'PATCH',
            credentials: 'include',
          });
        } catch (err) {
          console.error('Error logging view:', err);
        }
      }
    };

    fetchVideo();
    logView();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading video...</p>;
  if (!video) return <p className="text-center mt-10 text-red-500">Video not found.</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-2 max-w-[1440px] mx-auto">
      {/* Left: Main video */}
      <div className="flex-1">
        <video
          src={video.videoFile}
          controls
          autoPlay
          className="w-full rounded-lg shadow-md aspect-video"
        />

        <h3 className="mt-4 text-xl font-semibold">{video.title}</h3>

        <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
          <p className="text-gray-600">
            {video.views} views • {getTimeAgo(video.createdAt)}
          </p>
          <div className="flex flex-wrap gap-2">
            {auth.status && userData?._id !== video?.owner?._id && (
              <Button
                onClick={handleLike}
                className={`gap-2 px-4 py-2 flex items-center rounded-full transition-all duration-200
                  ${liked ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                <ThumbsUp className="w-5 h-5" />
                {likesCount}
              </Button>
            )}

            <Button onClick={() => setShowShare(true)}className="gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center rounded-full">
              <Share2 className="w-5 h-5 text-gray-600" />
              Share
            </Button>
            <ShareModal videoId="abc123" isOpen={showShare} onClose={() => setShowShare(false)} />
            <Button
              onClick={handleDownload}
              className="gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full flex items-center"
            >
              <Download className="w-5 h-5 text-gray-600" />
              Download
            </Button>
          </div>
        </div>

        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">{video.description}</p>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={video.owner.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">{video.owner.fullname}</p>
              <span className="text-sm text-gray-600">@{video.owner.username}</span>
              <p className='text-xs text-gray-500'>{subscribers} subscribers</p>
            </div>
          </div>

          {auth.status && userData?._id !== video?.owner?._id && (
            <Button
              onClick={handleSubscribe}
              className={`transition-all duration-200 text-sm font-medium rounded-[20px]  
                ${isSubscribed
                  ? 'bg-gray-400 text-black hover:bg-gray-300'
                  : 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                } px-5 py-2.5`}
            >
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          )}
        </div>

        <hr className="my-4 border-gray-300" />
        {/* You can add comments section here */}
        <CommentsSection videoId={id} />
      </div>

      {/* Right: Recommended videos */}
      <div className="w-full lg:w-[400px]">
        <Recommended excludeId={id} />
      </div>
    </div>
  );
};

export default PlayVideo;
