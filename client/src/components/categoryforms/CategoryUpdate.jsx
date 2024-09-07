/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CircleChevronRight, CircleChevronDown } from "lucide-react";
import { toast } from "react-toastify";

export default function CategoryUpdate() {
  const [categoryData, setCategoryData] = useState();
  const expressURL = import.meta.env.VITE_API_URL;
  const [categoryUpdateShow, setCategoryUpdateShow] = useState(false);

  const togglePanel = () => setCategoryUpdateShow(!categoryUpdateShow);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .put(`${expressURL}/api/categories/${data.id}`, data, {
          withCredentials: true,
        })
        .then(() => reset());
      toast.info("Category updated successfully!");
    } catch (err) {
      if (err) toast.error("An error occured, please try again");
    }
  };

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    try {
      axios.get(`${express}/api/categories`).then((response) => {
        const { data } = response;
        setCategoryData(data);
      });
    } catch (err) {
      if (err) toast.error("Couldn't retrieve the categories");
    }
  }, []);

  return (
    <section>
      <div className="header-panel">
        <h3>Rename a category</h3>
        <button
          type="button"
          onClick={togglePanel}
          className="show-button"
          aria-label="collapse panel"
        >
          {categoryUpdateShow ? (
            <CircleChevronDown strokeWidth={2} />
          ) : (
            <CircleChevronRight strokeWidth={2} />
          )}
        </button>
      </div>
      {categoryUpdateShow && (
        <form onSubmit={handleSubmit(onSubmit)} className="form-video-pannel">
          <div className="input-form-video">
            <label htmlFor="category"> Choose a Category </label>
            <select
              name="category"
              className="select-panel"
              {...register("id")}
            >
              {categoryData?.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >{`${cat.name.charAt(0).toUpperCase()}${cat.name.slice(1)}`}</option>
              ))}
              {errors.id && (
                <p className="form-error-login">{errors.id.message}</p>
              )}
            </select>
          </div>
          <div className="input-form-video">
            <label htmlFor="name"> name </label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "You need at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="form-error-login">{errors.name.message}</p>
            )}
          </div>
          <button type="submit" className="button-form-panel">
            {" "}
            Update category
          </button>
        </form>
      )}
    </section>
  );
}
