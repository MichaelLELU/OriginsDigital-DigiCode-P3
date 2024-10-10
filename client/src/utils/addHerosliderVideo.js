import axios from "axios";

const addHerosliderVideo = async (v) => {
  const express = import.meta.env.VITE_API_URL;
  try {
    await axios.post(
      `${express}/api/heroslider/`,
      {
        video_id: v,
      },
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    return null;
  }
};

export default addHerosliderVideo;
