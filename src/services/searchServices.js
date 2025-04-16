const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchVideosByTitle = async (query) => {
    try {
      const res = await fetch(`${BASE_URL}/videos/title/search?q=${query}`);
      if (!res.ok) throw new Error('No videos found');  
      const result = await res.json();
      return result.data; // Make sure this is the array of videos
    } catch (error) {
      console.error("Search failed:", error);
      throw error; // Re-throw the error so it can be handled in the component
    }
  };
  