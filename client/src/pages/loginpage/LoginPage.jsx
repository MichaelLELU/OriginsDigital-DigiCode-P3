/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from "axios";

export default function SignupPage() {

  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useOutletContext();
  const inputRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const expressURL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${expressURL}/api/auth/login`, data, 
          {
          withCredentials: true,
        },
          {
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' },
        })
        .then((response) => {
          setCurrentUser(response.data.user);
        }).finally(currentUser.role === "admin" ? navigate("/history9") : navigate("/"))
    } catch (error) {
      console.error(error);
    }
  };


  return ( 
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input
              ref={inputRef}
              type="text"
              name="email"
              {...register("email", {
                required: "This filed is required !",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Invalid email format",
                },
                maxLength: {
                  value: 120,
                  message: "You can't have more than 120 characters",
                },
              })}
            />
          </label>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <label>
          Password
          <input
            ref={inputRef}
            type="password"
            name="password"
            {...register("password", {
              required: "This field is required !",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){16,64}$/,
                message:
                  "You need at least 16 characters, including at least: one uppercase and one lowercase letter, one number and a special character",
              },
              maxLength: {
                value: 64,
                message: "You can't put more that 64 characters",
              },
            })}
          />
        </label>
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}

        <button type="submit" >Login</button>
      </form>
    </>
  );
}
