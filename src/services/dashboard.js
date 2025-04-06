
export const getChannelStats = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/stats`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch channel stats");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getChannelVideos = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/videos`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch channel videos");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};