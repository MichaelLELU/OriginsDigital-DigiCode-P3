import axios from "axios";

const removeHerosliderVideo = async (v) => {
  const express = import.meta.env.VITE_API_URL;
  try {
    await axios.delete(`${express}/api/heroslider/${v}`);
    return true;
  } catch (error) {
    return null;
  }
};

export default removeHerosliderVideo;
