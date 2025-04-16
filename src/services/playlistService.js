const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/playlists`; // Adjust if needed

export const createPlaylist = async (data) => {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getUserPlaylists = async (userId) => {
  const res = await fetch(`${API_BASE}/user/${userId}`, {
    method: "GET",
    credentials: "include"
  });
  return res.json();
};

export const getPlaylistById = async (playlistId) => {
  const res = await fetch(`${API_BASE}/${playlistId}`, {
    method: "GET",
    credentials: "include"
  });
  return res.json();
};

export const updatePlaylist = async (playlistId, data) => {
  const res = await fetch(`${API_BASE}/${playlistId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deletePlaylist = async (playlistId) => {
  const res = await fetch(`${API_BASE}/${playlistId}`, {
    method: "DELETE",
    credentials: "include"
  });
  return res.json();
};

export const addVideoToPlaylist = async (playlistId, videoId) => {
  const res = await fetch(`${API_BASE}/add/${videoId}/${playlistId}`, {
    method: "PATCH",
    credentials: "include"
  });
  return res.json();
};

export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  const res = await fetch(`${API_BASE}/remove/${videoId}/${playlistId}`, {
    method: "PATCH",
    credentials: "include"
  });
  return res.json();
};
