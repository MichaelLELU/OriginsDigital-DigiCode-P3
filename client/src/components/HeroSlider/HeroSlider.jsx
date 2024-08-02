/* eslint-disable import/no-unresolved */
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import "./HeroSlider.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider({ numberOfSlides = null }) {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    try {
      axios.get(`${express}/api/videos`).then((response) => {
        const { data } = response;
        setVideoData(data);
      });
    } catch (err) {
      if (err) toast.error("Error when fetching data");
    }
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={50}
      breakpoints={{
        768: {
          slidesPerView: numberOfSlides || 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: numberOfSlides || 3,
          spaceBetween: 50,
        },
      }}
      pagination={{
        clickable: true,
      }}
      style={{
        "--swiper-navigation-color": "rgb(255,250,250)",
        "--swiper-pagination-color": "rgb(255,250,250)",
      }}
      navigation
      modules={[Pagination, Navigation]}
      className="heroSwiper"
      id="heroSwiper"
    >
      {videoData.slice(0, 5).map((v) => (
        <SwiperSlide key={v.title} id="heroSlide">
          <NavLink to={`/video/${v.id}`}>
            <img id="imageHero" src={v.image} alt={v.title} />
          </NavLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

HeroSlider.propTypes = {
  numberOfSlides: PropTypes.number.isRequired,
};
