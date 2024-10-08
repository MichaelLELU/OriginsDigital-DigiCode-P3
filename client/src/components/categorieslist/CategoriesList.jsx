/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import VideoCard from "../videocard/VideoCard";
import "swiper/css";
import "swiper/css/navigation";
import "./CategoriesList.css";

export default function CategoriesList({ category, reload = false }) {
  const { name } = category;
  const [result, setResult] = useState();

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;

    const fetchCategoryVideo = async () => {
      try {
        const data = await axios
          .get(`${express}/api/categories/${name}`)
          .then((response) => response.data);

        setResult(data);
      } catch (error) {
        toast.error("An error occured, please try again");
      }
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
          <VideoCard video={v} reload={reload} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

CategoriesList.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  reload: PropTypes.bool,
};
