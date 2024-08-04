/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import VideoCard from "../videocard/VideoCard";
import "swiper/css";
import "swiper/css/navigation";
import "./CategoriesList.css";

export default function CategoriesList({ category }) {
  const { name } = category;
  const [result, setResult] = useState();

  const fetchCategoryVideo = useMemo(
    () => async () => {
      const express = import.meta.env.VITE_API_URL;

      try {
        const data = await axios
          .get(`${express}/api/categories/${name}`)
          .then((response) => response.data);

        setResult(data);
      } catch (error) {
        toast.error("An error occured, please try again");
      }
    },
    [name]
  );

  useEffect(() => {
    fetchCategoryVideo();
  }, [fetchCategoryVideo]);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={50}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
      style={{
        "--swiper-navigation-color": "rgb(255,250,250)",
      }}
      navigation
      modules={[Navigation]}
      className="categorySwiper"
      id="categorySwiper"
    >
      {result?.map((v) => (
        <SwiperSlide key={v.id} id="categorySlide">
          <VideoCard video={v} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

CategoriesList.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
