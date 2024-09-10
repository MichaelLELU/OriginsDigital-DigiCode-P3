/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { CircleChevronRight, CircleChevronDown } from "lucide-react";

export default function CategoryAdd() {
  const expressURL = import.meta.env.VITE_API_URL;
  const [categoryAddShow, setCategoryAddShow] = useState(false);

  const togglePanel = () => setCategoryAddShow(!categoryAddShow);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${expressURL}/api/categories`, data, {
          withCredentials: true,
        })
        .then(() => reset());
      toast.success("Category added successfully!");
    } catch (err) {
      if (err) toast.error("Something went wrong while adding the category");
    }
  };

  const requiredFieldError = "This field is required!";

  return (
    <section>
      <div className="header-panel">
        <h3> Add a category </h3>
        <button
          type="button"
          onClick={togglePanel}
          className="show-button"
          aria-label="collapse panel"
        >
          {categoryAddShow ? (
            <CircleChevronDown strokeWidth={2} />
          ) : (
            <CircleChevronRight strokeWidth={2} />
          )}
        </button>
      </div>
      {categoryAddShow && (
        <form onSubmit={handleSubmit(onSubmit)} className="form-category-panel">
          <div className="panel-category">
            <label htmlFor="name"> Category name </label>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: requiredFieldError,
                minLength: {
                  value: 2,
                  message: "You need at least 2 characters",
                },
              })}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <button type="submit" className="button-form-panel">
            Add category
          </button>
        </form>
      )}
    </section>
  );
}
