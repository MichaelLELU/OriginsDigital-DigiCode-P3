import axios from "axios";

const removeFavorite = async (v, u) => {
  const express = import.meta.env.VITE_API_URL;
  try {
    await axios.delete(`${express}/api/favorites/${v}`, {
      data: { user_id: u },
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return null;
  }
};

export default removeFavorite;
