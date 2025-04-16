const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/likes`; // Adjust if needed

export const getLikedVideos = async()=>{
    const res = await fetch(`${API_BASE}/videos`,{
        method: "GET",
        credentials: "include"
    });
    const result  = await res.json()
    if (!res.ok) throw new Error(result.message || 'Failed to fetch user videos');
    return result.data

}