import axios from "axios";

const addFavorite = async (v, u) => {
  const express = import.meta.env.VITE_API_URL;
  try {
    await axios.post(`${express}/api/favorites/${v}`, {
      user_id: u,
    });
    return true;
  } catch (error) {
    return null;
  }
};

export default addFavorite;
