import { useLoaderData, useOutletContext } from "react-router-dom";
import { BookMarkedIcon, SparklesIcon, Dices } from "lucide-react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import SearchBar from "../../components/searchbar/SearchBar";
import VideoList from "../../components/videolist/VideoList";

import "./HomePage.css";

export default function HomePage() {
  const videoData = useLoaderData();
  const { currentUser } = useOutletContext();

  const newVideos = videoData[0];
  const randomVideos = videoData[1];

  return (
    <>
      <h2>
        {"Featured "} <BookMarkedIcon color="#1FD360" strokeWidth={1.75} />
      </h2>
      <HeroSlider numberOfSlides={1} currentUser={currentUser} />

      <style>
        {"#heroSlide.swiper-slide {display: flex; justify-content: center}"}
      </style>

      <SearchBar />

      <h2 className="title-home">
        {"New videos "}
        <SparklesIcon color="#FFDF00" strokeWidth={1.75} />
      </h2>
      <VideoList videoData={newVideos} />

      <h2 className="title-home">
        {"Random videos "}
        <Dices color="#1FD360" strokeWidth={1.75} />
      </h2>
      <VideoList videoData={randomVideos} />
    </>
  );
}
