import React, { useEffect, useState } from 'react';
import { getSubscribedChannels } from '@/services/subscriberService';
import { useSelector } from 'react-redux';

const Subscriptions = () => {
  const userId = useSelector((state) => state.auth.userData._id);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await getSubscribedChannels(userId);
        console.log("Subscriptions response:", res);
        setSubscriptions(res);
      } catch (error) {
        console.error('Failed to fetch subscribed channels:', error);
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  if (loading) return <p className="mt-8 text-center">Loading subscriptions...</p>;

  if (!subscriptions || subscriptions.length === 0) {
    return <p className="mt-8 text-center text-gray-500">You're not subscribed to any channels.</p>;
  }

  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => {
        const channel = subscription.channel;
        
        return (
          <div key={subscription._id} className="flex items-center space-x-4">
            <img
              src={channel.avatar || '/default-avatar.png'}
              alt="avatar"
              className="w-48 h-48 rounded-full object-cover"
            />
            <div>
              <p className="text-2xl font-semibold">{channel.fullname || 'Unnamed Channel'}</p>
              <span className="text-xl text-gray-600">@{channel.username || 'unknown'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;