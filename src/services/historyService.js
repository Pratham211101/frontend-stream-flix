const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/users/history`;

export const getHistory= async() =>{
    const res = await fetch(`${API_BASE}`,{
        method: "GET",
        credentials: "include"
    });
    const result  = await res.json()
    if (!res.ok) throw new Error(result.message || 'Failed to fetch user history');
    return result.data

}

export const addtoHistory = async(videoId) => {
    const res = await fetch(`${API_BASE}/${videoId}`,{
        method: "PATCH",
        credentials: "include"
    });
    const result  = await res.json()
    if (!res.ok) throw new Error(result.message || 'Failed to add to history');
    return result.data
}