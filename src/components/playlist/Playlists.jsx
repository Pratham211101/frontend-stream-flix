import { useEffect, useState } from "react";
import { getUserPlaylists, deletePlaylist } from "@/services/playlistService";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { getVideoById } from "@/services/video";
import { Dialog, DialogContent, DialogTrigger,DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PlaylistForm from "./PlaylistForm";

export default function Playlists() {
    const userId = useSelector((state) => state.auth?.userData?._id);
    const [videoThumbnails, setVideoThumbnails] = useState({});
    const [playlists, setPlaylists] = useState([]);
    const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchPlaylists = async () => {
        try {
          const res = await getUserPlaylists(userId);
          const playlistData = res.data;
          setPlaylists(playlistData);
      
          // Fetch thumbnails for each playlist's videos (limit 1)
          const thumbnailsMap = {};
          for (const playlist of playlistData) {
            const videoIds = playlist.videos.slice(0, 1); // max 1 videos
            thumbnailsMap[playlist._id] = [];
      
            for (const videoId of videoIds) {
              try {
                const videoRes = await getVideoById(videoId);
                console.log("Video response for", videoId, ":", videoRes);
                const thumbnail = videoRes.thumbnail; // adapt if your key is different
                console.log("Thumbnail for", videoId, ":", thumbnail);
                
                thumbnailsMap[playlist._id].push({ videoId, thumbnail });
              } catch (err) {
                console.error("Error fetching video:", videoId, err);
              }
            }
          }
      
          setVideoThumbnails(thumbnailsMap);
        } catch (error) {
          console.error("Failed to fetch playlists:", error);
        }
      };
    if (userId) {
      fetchPlaylists();
    }
  }, [userId,playlists]);

  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete playlist:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <div className="flex items-center justify-center border-2 border-dashed p-6 rounded-xl cursor-pointer hover:bg-muted aspect-[16/9]">
        <Plus className="w-8 h-8 text-muted-foreground" />
      </div>
    </DialogTrigger>

    <DialogContent className="max-w-md bg-gray-100 border-none shadow-lg">
      <DialogTitle className="text-lg font-semibold mb-2">Create Playlist</DialogTitle>
      <PlaylistForm onSuccess={() => setOpen(false)} />
    </DialogContent>
    </Dialog>


  {playlists.map((pl) => (
    <div
    key={pl._id}
    // Applied zoom and cursor-pointer to the parent div to zoom the entire container and change cursor on hover
    className="bg-blue-50 p-3 rounded-xl shadow-xl flex flex-col h-full cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
  >
    <h2 className="text-xl font-semibold">{pl.name}</h2>
    <p className="text-sm text-muted-foreground">{pl.description}</p>
  
    <div className="min-h-[150px] mt-2 flex-1">
      {(videoThumbnails[pl._id] || []).slice(0, 1).map((vid) => (
        <div className="aspect-[16/9] w-full overflow-hidden rounded relative">
          <img
            key={vid.videoId}
            src={vid.thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  
    <div className="flex gap-1 mt-1">
      <Button
        className="cursor-pointer w-full sm:w-auto px-6 py-2 text-sm font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-primary/90 hover:scale-105 active:bg-primary/80 focus:ring-2 focus:ring-primary focus:ring-offset-2"
        variant="destructive"
        onClick={() => handleDelete(pl._id)}
      >
        Delete
      </Button>
    </div>
  </div>
  
  ))}
</div>

  );
}
