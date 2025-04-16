import {useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPlaylist } from "@/services/playlistService";

export default function PlaylistForm({ onSuccess }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
  
    const handleSubmit = async () => {
      if (!name || !description) return;
      await createPlaylist({ name, description });
      setName("");
      setDescription("");
      alert("Playlist created");
      onSuccess?.(); // close modal if passed
    };
  
    return (
      <div className="space-y-4">
        <Input
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-blue-50 text-gray-800 border-0 focus:ring-2 focus:ring-blue-200 focus:outline-none p-2 rounded-md"
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-blue-50 text-gray-800 border-0 focus:ring-2 focus:ring-blue-200 focus:outline-none p-2 rounded-md"
        />

        <Button
            className="cursor-pointer w-full sm:w-auto px-6 py-2 text-sm font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-primary/90 hover:scale-105 active:bg-primary/80 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={handleSubmit}
        >
            Create Playlist
        </Button>

      </div>
    );
  }
  