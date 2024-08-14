/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PropTypes from "prop-types";

export default function NameUpdate({ user }) {
  const expressURL = import.meta.env.VITE_API_URL;
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    axios.get(`${expressURL}/api/users/${user?.id}`).then((response) => {
      setCurrentUser({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
      });
    });
  }, [user, expressURL, setCurrentUser]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.put(`${expressURL}/api/users/${user.id}/name`, data, {
        withCredentials: true,
      });
      toast.success("Your user informations have been updated");
      reset();
    } catch (err) {
      if (err) toast.error("An error occured, please try again");
    }
  };

  const requiredFieldError = "This field is required";
  const min2CharactersError = "You need at least 2 characters";
  const max120CharactersError = "You can't have more than 120 characters";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <label htmlFor="firstname">Firstname</label>
      <input
        className="upload-input"
        type="text"
        name="firstname"
        id="firstname"
        placeholder={currentUser?.firstname || "Firstname"}
        {...register("firstname", {
          required: requiredFieldError,
          minLength: {
            value: 2,
            message: min2CharactersError,
          },
          maxLength: {
            value: 120,
            message: max120CharactersError,
          },
        })}
      />
      {errors.firstname && (
        <p className="form-error">{errors.firstname.message}</p>
      )}
      <label htmlFor="lastname">Lastname</label>
      <input
        className="upload-input"
        type="text"
        name="lastname"
        id="lastname"
        placeholder={currentUser?.lastname || "Lastname"}
        {...register("lastname", {
          required: requiredFieldError,
          minLength: {
            value: 2,
            message: min2CharactersError,
          },
          maxLength: {
            value: 120,
            message: max120CharactersError,
          },
        })}
      />
      <button type="submit" className="update-submit">
        Update
      </button>
    </form>
  );
}

NameUpdate.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
