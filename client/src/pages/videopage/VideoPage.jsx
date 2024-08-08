import { useState, useEffect } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HistoryIcon, HeartIcon, HeartOffIcon } from "lucide-react";
import addFavorite from "../../utils/addFavorites";
import removeFavorite from "../../utils/removeFavorites";

import "./VideoPage.css";
import CategoriesList from "../../components/categorieslist/CategoriesList";

export default function VideoPage() {
  const loaderData = useLoaderData();
  const videoData = loaderData[0];
  const currentUser = loaderData[1];
  const Navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // view if video is in favorites
  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    if (currentUser) {
      const fetchFavorite = async () => {
        try {
          const response = await axios.post(
            `${express}/api/favorites/check/${videoData.id}`,
            {
              user_id: currentUser.id,
            }
          );
          if (response.status === 200) {
            setIsFavorite(true);
          }
        } catch (error) {
          toast.error("An error occurred while retrieving your favorites");
        }
      };
      fetchFavorite();
    }
  }, [videoData.id, currentUser]);

  const toggleFavorite = () => {
    if (!isFavorite) {
      addFavorite(videoData.id, currentUser.id);
      setIsFavorite(true);
    } else {
      removeFavorite(videoData.id, currentUser.id);
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    if (videoData.is_connected && !currentUser) {
      setTimeout(() => Navigate("/login"), 4000);
    }
  }, [videoData.is_connected, currentUser, Navigate]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <button type="button" onClick={handleBack} className="backButton">
        <HistoryIcon size={18} />
        Back
      </button>

      {videoData.is_connected && currentUser === null ? (
        <h1 className="video-title">
          <span className="redirection-message">
            {
              "To view this video, you need to be connected. \nYou will be redirected to the login page . . ."
            }
          </span>
        </h1>
      ) : (
        <>
          <div className="video-container">
            <h1 className="video-title">{videoData.title}</h1>

            <video controls poster={videoData.image} className="video-playback">
              <source src={videoData.url} type="video/mp4" />
              <track kind="captions" />
            </video>

            <div className="video-description">
              <p className={`video-metadata ${currentUser ? "full" : "short"}`}>
                <span>
                  {videoData.date != null
                    ? videoData.date.slice(0, 10)
                    : "No date"}
                </span>

                <span>
                  {videoData.category != null ? (
                    <Link to={`/categories/${videoData.category}`}>
                      {videoData.category}
                    </Link>
                  ) : (
                    "No category"
                  )}
                </span>

                {currentUser && (
                  <button
                    type="button"
                    className="favorite-button"
                    onClick={toggleFavorite}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {!isFavorite && <HeartIcon color="#1FD360" />}
                    {isFavorite &&
                      (!isHovered ? (
                        <HeartIcon fill="red" color="red" />
                      ) : (
                        <HeartOffIcon color="#FFDF00" fill="red" />
                      ))}
                  </button>
                )}
              </p>

              <p>{videoData.description}</p>
            </div>
          </div>

          <h3 className="related-videos">
            More videos in {videoData.category}
          </h3>
          <CategoriesList category={{ name: videoData.category }} />
        </>
      )}
    </>
  );
}
