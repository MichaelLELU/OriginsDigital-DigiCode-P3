/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleChevronRight, CircleChevronDown } from "lucide-react";

import "./CategoryPanel.css";

export default function CategoryDelete() {
  const [categoryData, setCategoryData] = useState();
  const expressURL = import.meta.env.VITE_API_URL;
  const [categoryDeleteShow, setCategoryDeleteShow] = useState(false);

  const togglePanel = () => setCategoryDeleteShow(!categoryDeleteShow);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .delete(
          `${expressURL}/api/categories/${data?.id}`,
          {
            withCredentials: true,
          },
          data
        )
        .then(() => reset());
      toast.info("Category deleted successfully!");
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
        <h3> Delete a category </h3>
        <button
          type="button"
          onClick={togglePanel}
          className="show-button"
          aria-label="collapse panel"
        >
          {categoryDeleteShow ? (
            <CircleChevronDown strokeWidth={2} />
          ) : (
            <CircleChevronRight strokeWidth={2} />
          )}
        </button>
      </div>
      {categoryDeleteShow && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="panel-category">
            <label htmlFor="category"> Choose a category </label>
            <select
              className="select-panel"
              name="category"
              {...register("id")}
            >
              {categoryData?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {`${cat.name.charAt(0).toUpperCase()}${cat.name.slice(1)}`}
                </option>
              ))}
              {errors.id && <p className="form-error">{errors.id.message}</p>}
            </select>
          </div>

          <button type="submit" className="button-form-panel">
            {" "}
            Delete category
          </button>
        </form>
      )}
    </section>
  );
}
