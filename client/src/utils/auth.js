import axios from "axios";

const fetchAuth = async () => {
  try {
    return await axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/checkauth`, {
        withCredentials: true,
      })
      .then((response) => response.data.user);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default fetchAuth;
