/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircleChevronRight, CircleChevronDown } from "lucide-react";
import { toast } from "react-toastify";

export default function VideoUpdate() {
  const [videoData, setVideoData] = useState();
  const expressURL = import.meta.env.VITE_API_URL;
  const [videoUpdateShow, setVideoUpdateShow] = useState(false);
  const { register, handleSubmit } = useForm();

  const togglePanel = () => setVideoUpdateShow(!videoUpdateShow);

  const onSubmit = async (data) => {
    try {
      axios.put(`${expressURL}/api/videos/${data.id}`, data, {
        withCredentials: true,
      });
      toast.success("Video access updated successfully ! ");
    } catch (error) {
      toast.error("An error occured, please try again later");
    }
  };

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    try {
      axios.get(`${express}/api/videos`).then((response) => {
        const { data } = response;
        setVideoData(data);
      });
    } catch (error) {
      toast.error("An error occured, please try again later");
    }
  }, []);

  return (
    <>
      <div className="header-panel">
        <h3> Update a video </h3>
        <button
          type="button"
          onClick={togglePanel}
          className="show-button"
          aria-label="collapse panel"
        >
          {videoUpdateShow ? (
            <CircleChevronDown strokeWidth={2} />
          ) : (
            <CircleChevronRight strokeWidth={2} />
          )}
        </button>
      </div>
      {videoUpdateShow && (
        <form className="form-video-pannel" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-form-video">
            <label htmlFor="videoUpdate"> Choose a video </label>
            <select
              className="select-panel"
              name="videoupdate"
              {...register("id")}
            >
              {videoData?.map((v) => (
                <option key={v.id} value={v.id}>
                  {`${v.title.charAt(0).toUpperCase()}${v.title.slice(1)}`}
                </option>
              ))}
            </select>
          </div>
          <div className="input-form-video">
            {" "}
            <label htmlFor="access"> Access :</label>
            <input
              type="radio"
              name="free"
              value="0"
              {...register("is_connected")}
            />
            <label htmlFor="acces"> Free </label>
            <input
              type="radio"
              name="premium"
              value="1"
              {...register("is_connected")}
            />
            <label htmlFor="acces"> Premium </label>
          </div>
          <button type="submit" className="button-form-panel">
            Update Video
          </button>
        </form>
      )}
    </>
  );
}
