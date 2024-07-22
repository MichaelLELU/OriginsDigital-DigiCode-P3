/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function CategoryDelete() {
  const [categoryData, setCategoryData] = useState();
  const expressURL = import.meta.env.VITE_API_URL;

  const [hasCategoryDeleteFailed, setHasCategoryDeleteFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .delete(`${expressURL}/api/categories/${data.id}`, data)
        .then(() => reset());
    } catch (err) {
      if (err) setHasCategoryDeleteFailed(true);
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
      <h2>Delete a category</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pannel-category">
          <label htmlFor="category"> Category </label>
          <select name="category" {...register("id")}>
            {categoryData?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {`${cat.name.charAt(0).toUpperCase()}${cat.name.slice(1)}`}
              </option>
            ))}
            {errors.id && <p>{errors.id.message}</p>}
          </select>
        </div>

        {hasCategoryDeleteFailed && (
          <p className="form-error" style={{ marginBottom: "1rem" }}>
            Something went wrong while deleting the category
          </p>
        )}

        <button type="submit"> Delete category</button>
      </form>
    </section>
  );
}
