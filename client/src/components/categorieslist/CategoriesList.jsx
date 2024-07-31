/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import PropTypes from "prop-types";
import VideoCard from "../videocard/VideoCard";
import "./CategoriesList.css";

export default function CategoriesList({ category }) {
  const { name } = category;
  const [result, setResult] = useState();

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    const fetchCategoryVideo = async () => {
      const response = await fetch(
        `${express}/api/categories/${name || category}`
      );
      const data = await response.json();
      setResult(data);
    };

    fetchCategoryVideo();
  }, [category, name]);

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
