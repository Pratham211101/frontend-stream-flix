const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all published videos with optional filters
export const getAllVideos = async ({ page = 1, limit = 10, query = '', sortBy = '', sortType = '', userId = '' } = {}) => {
  const params = new URLSearchParams({ page, limit, query, sortBy, sortType, userId });

  try {
    const res = await fetch(`${BASE_URL}/videos?${params.toString()}`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch videos');

    return result.data.videos;
  } catch (error) {
    throw error;
  }
};

// Get a single video by ID
export const getVideoById = async (videoId) => {
  try {
    const res = await fetch(`${BASE_URL}/videos/${videoId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch video');

    return result.data;
  } catch (error) {
    throw error;
  }
};

// Upload/publish a new video


// Update an existing video
export const updateVideo = async (videoId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/videos/${videoId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update video');

    return result.data;
  } catch (error) {
    throw error;
  }
};

// Delete a video
export const deleteVideo = async (videoId) => {
  try {
    const res = await fetch(`${BASE_URL}/videos/${videoId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to delete video');

    return result.data;
  } catch (error) {
    throw error;
  }
};

// Toggle publish status of a video
export const togglePublishStatus = async (videoId) => {
  try {
    const res = await fetch(`${BASE_URL}/videos/${videoId}/toggle`, {
      method: 'PATCH',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to toggle publish status');

    return result.data;
  } catch (error) {
    throw error;
  }
};
