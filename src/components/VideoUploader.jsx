import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const VideoUploadForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('videoFile', data.videoFile[0]);
    formData.append('thumbnail', data.thumbnail[0]);

    setUploading(true);
    setSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Upload failed');

      setUploading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate('/videos'); // your "All Videos" page
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error.message);
      setUploading(false);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-xl shadow space-y-4 relative">
      <h2 className="text-2xl font-bold text-center">Upload Video</h2>

      <input
        {...register('title', { required: true })}
        type="text"
        placeholder="Title"
        className="w-full border rounded px-3 py-2"
      />
      {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

      <textarea
        {...register('description', { required: true })}
        placeholder="Description"
        className="w-full border rounded px-3 py-2"
      />
      {errors.description && <p className="text-red-500 text-sm">Description is required</p>}

      <div>
        <label className="text-gray-700">Video File</label>
        <input
          {...register('videoFile', { required: true })}
          type="file"
          accept="video/*"
          className="block w-full mt-1"
        />
        {errors.videoFile && <p className="text-red-500 text-sm">Video is required</p>}
      </div>

      <div>
        <label className="text-gray-700">Thumbnail</label>
        <input
          {...register('thumbnail', { required: true })}
          type="file"
          accept="image/*"
          className="block w-full mt-1"
        />
        {errors.thumbnail && <p className="text-red-500 text-sm">Thumbnail is required</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      <AnimatePresence>
        {uploading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            />
          </motion.div>
        )}

        {success && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaCheckCircle className="text-green-500 text-5xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default VideoUploadForm;
