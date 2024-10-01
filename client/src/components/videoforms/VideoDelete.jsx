/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleChevronRight, CircleChevronDown } from "lucide-react";

export default function VideoDelete() {
  const [videoData, setVideoData] = useState();
  const expressURL = import.meta.env.VITE_API_URL;
  const [videoDeleteShow, setVideoDeleteShow] = useState(false);
  const togglePanel = () => setVideoDeleteShow(!videoDeleteShow);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .delete(
          `${expressURL}/api/videos/${data.id}`,
          {
            withCredentials: true,
          },
          data
        )
        .then(() => reset());
      toast.info("Video deleted successfully!");
    } catch (err) {
      if (err) toast.error("An error occured, please try again");
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
      <div className="header-panel">
        <h3> Delete a video </h3>
        <button
          type="button"
          onClick={togglePanel}
          className="show-button"
          aria-label="collapse panel"
        >
          {videoDeleteShow ? (
            <CircleChevronDown strokeWidth={2} />
          ) : (
            <CircleChevronRight strokeWidth={2} />
          )}
        </button>
      </div>
      {videoDeleteShow && (
        <form className="form-video-pannel" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-form-video">
            <label htmlFor="videodelete"> Choose a video </label>
            <select
              className="select-panel"
              name="videodelete"
              {...register("id")}
            >
              {videoData?.map((video) => (
                <option key={video.id} value={video.id}>
                  {`${video.title.charAt(0).toUpperCase()}${video.title.slice(1)}`}
                </option>
              ))}
              {errors.id && <p className="form-error">{errors.id.message}</p>}
            </select>
          </div>

          <button type="submit" className="button-form-panel">
            Delete video
          </button>
        </form>
      )}
    </section>
  );
}
