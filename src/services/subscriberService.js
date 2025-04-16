const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/subscriptions/u`;

export const getSubscribedChannels = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch subscribed channels');
        const result = await res.json();
        return result.data; // Assuming the data is in the 'data' property
    } catch (error) {
        console.error('Error fetching subscribed channels:', error);
        throw error;
    }
}