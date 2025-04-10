import React, { useState,useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import { motion, AnimatePresence } from 'framer-motion';

const Spinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center h-60 space-y-4"
  >
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-blue-500 font-medium">Uploading your video...</p>
  </motion.div>
);

const SuccessAnimation = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center h-60 space-y-4"
  >
    <div className="text-green-500 text-5xl">✅</div>
    <p className="text-lg font-semibold">Upload successful!</p>
    <p className="text-sm text-gray-500">Redirecting to your videos...</p>
  </motion.div>
); 

const VideoUploadForm = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const videoWatch = watch('videoFile');

  const onSubmit = async () => {
    const data = getValues();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('visibility', data.visibility);
    formData.append('videoFile', data.videoFile[0]);
    formData.append('thumbnail', data.thumbnail[0]);
    setUploading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Upload failed');
      setSubmitted(true);
      setTimeout(() => {
        navigate('/your-videos');
      }, 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const step1Content = (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Step 1: Upload Video</h2>
      <input
        {...register('videoFile', { required: true })}
        type="file"
        accept="video/*"
        className="block w-full border rounded px-3 py-2"
      />
    </div>
  );

  const step2Content = (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Step 2: Details</h2>
      <input
        {...register('title', { required: true })}
        placeholder="Title"
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        {...register('description', { required: true })}
        placeholder="Description"
        className="w-full border rounded px-3 py-2"
      />
      <input
        {...register('thumbnail', { required: true })}
        type="file"
        accept="image/*"
        className="block w-full"
      />
    </div>
  );

  const step3Content = (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Step 3: Visibility</h2>
      <label className="flex items-center space-x-2">
        <input type="radio" value="public" {...register('visibility', { required: true })} />
        <span>Public</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" value="unlisted" {...register('visibility')} />
        <span>Unlisted</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="radio" value="private" {...register('visibility')} />
        <span>Private</span>
      </label>
    </div>
  );

  const steps = useMemo(() => [
    {
      label: 'Upload',
      name: 'upload',
      content: step1Content,
      validator: () => {
        const video = getValues('videoFile');
        console.log('Validating Step 1:', video);
        return video && video.length > 0 && video[0] instanceof File && video[0].type.startsWith('video/');
      },
    },
    {
      label: 'Details',
      name: 'details',
      content: step2Content,
      validator: () => {
        const data = getValues();
        return !!data.title && !!data.description && data.thumbnail?.length > 0;
      },
    },
    {
      label: 'Visibility',
      name: 'visibility',
      content: step3Content,
      validator: () => !!getValues('visibility'),
    },
  ], [videoWatch]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <AnimatePresence mode="wait">
      { uploading ? (
          <Spinner key="loading" />
        ) : submitted ? (
          <SuccessAnimation key="success" />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StepProgressBar
              startingStep={0}
              steps={steps}
              onSubmit={handleSubmit(onSubmit)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
};

export default VideoUploadForm;
