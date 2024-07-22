/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function VideoDelete() {
  const [videoData, setVideoData] = useState();
  const expressURL = import.meta.env.VITE_API_URL;

  const [hasVideoDeleteFailed, setHasVideoDeleteFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .delete(`${expressURL}/api/videos/${data.id}`, data)
        .then(() => reset());
    } catch (err) {
      if (err) setHasVideoDeleteFailed(true);
    }
  };

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    try {
      axios.get(`${express}/api/videos`).then((response) => {
        const { data } = response;
        setVideoData(data);
      });
    } catch (err) {
      if (err) toast.error("Couldn't retrieve the videos");
    }
  }, []);

  return (
    <section>
      <h2>Delete a video</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="videodelete"> Category </label>
          <select name="videodelete" {...register("id")}>
            {videoData?.map((video) => (
              <option key={video.id} value={video.id}>
                {`${video.title.charAt(0).toUpperCase()}${video.title.slice(1)}`}
              </option>
            ))}
            {errors.id && <p>{errors.id.message}</p>}
          </select>
        </div>

        {hasVideoDeleteFailed && (
          <p className="form-error" style={{ marginBottom: "1rem" }}>
            Something went wrong while deleting the video
          </p>
        )}

        <button type="submit">Delete video</button>
      </form>
    </section>
  );
}
