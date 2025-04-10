const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Create a new playlist
 * 
 * @param {Object} playlistData - Object containing name and description
 * @returns {Promise<Object>} - The created playlist
 */
export const createPlaylist = async (playlistData) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlistData)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to create playlist');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all playlists for a user
 * 
 * @param {string} userId - ID of the user whose playlists to retrieve
 * @returns {Promise<Array>} - Array of playlists
 */
export const getUserPlaylists = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch user playlists');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a playlist by its ID
 * 
 * @param {string} playlistId - ID of the playlist to fetch
 * @returns {Promise<Object>} - The playlist details
 */
export const getPlaylistById = async (playlistId) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch playlist');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Add a video to a playlist
 * 
 * @param {string} playlistId - ID of the playlist
 * @param {string} videoId - ID of the video to add
 * @returns {Promise<Object>} - The updated playlist
 */
export const addVideoToPlaylist = async (playlistId, videoId) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/videos/${videoId}`, {
      method: 'POST',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to add video to playlist');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Remove a video from a playlist
 * 
 * @param {string} playlistId - ID of the playlist
 * @param {string} videoId - ID of the video to remove
 * @returns {Promise<Object>} - The updated playlist
 */
export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}/videos/${videoId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to remove video from playlist');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a playlist
 * 
 * @param {string} playlistId - ID of the playlist to delete
 * @returns {Promise<Object>} - API response
 */
export const deletePlaylist = async (playlistId) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to delete playlist');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a playlist's details
 * 
 * @param {string} playlistId - ID of the playlist to update
 * @param {Object} updateData - Object containing name and/or description
 * @returns {Promise<Object>} - The updated playlist
 */
export const updatePlaylist = async (playlistId, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update playlist');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all playlists for the currently logged-in user
 * 
 * @returns {Promise<Array>} - Array of playlists
 */
export const getMyPlaylists = async () => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/me`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch your playlists');

    return result.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Check if a video exists in any of the user's playlists
 * 
 * @param {string} videoId - ID of the video to check
 * @returns {Promise<Object>} - Object containing playlist info
 */
export const checkVideoInPlaylists = async (videoId) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists/check-video/${videoId}`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to check video in playlists');

    return result.data;
  } catch (error) {
    throw error;
  }
};