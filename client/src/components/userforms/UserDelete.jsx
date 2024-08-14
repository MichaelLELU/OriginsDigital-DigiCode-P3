import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import userLogout from "../../utils/logout";

export default function UserDelete({ user }) {
  const expressURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { handleSubmit } = useForm();

  const toggleLogout = () => {
    userLogout().then(() => navigate("/"));
  };

  const onSubmit = async () => {
    try {
      await axios.delete(`${expressURL}/api/users/${user.id}`, {
        withCredentials: true,
      });
      toggleLogout();
      toast.info("User deleted!");
    } catch (err) {
      if (err) toast.error("An error occured, please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit" className="button-form-panel">
        {" "}
        Delete
      </button>
    </form>
  );
}

UserDelete.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
