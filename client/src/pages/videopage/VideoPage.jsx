import {
  useLoaderData,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./VideoPage.css";
import { HistoryIcon } from "lucide-react";
import CategoriesList from "../../components/categorieslist/CategoriesList";

export default function VideoPage() {
  const videoData = useLoaderData();
  const { currentUser } = useOutletContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const Navigate = useNavigate();

  // view if video is in favorites
  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    const fetchFavorite = async () => {
      try {
        const response = await axios.get(
          `${express}/api/favorites/check/${videoData.id}`,
          {
            user_id: currentUser.id,
          }
        );
        console.info(response);

        if (response.status === 200) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      fetchFavorite();
    }
  }, [videoData.id, currentUser]);

  const addFavorite = async () => {
    const express = import.meta.env.VITE_API_URL;
    try {
      await axios.post(`${express}/api/favorites/${videoData.id}`, {
        user_id: currentUser.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async () => {
    const express = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${express}/api/favorites/${videoData.id}`, {
        data: {
          user_id: currentUser.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = () => {
    try {
      if (isFavorite === false) {
        setIsFavorite(true);
        addFavorite();
      } else {
        setIsFavorite(false);
        removeFavorite();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (videoData.is_connected && !currentUser) {
      setTimeout(() => Navigate("/login"), 5000);
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
              <p className="video-metadata">
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
              </p>
              <p>{videoData.description}</p>
              <button type="button" onClick={toggleFavorite}>
                {isFavorite === false ? "🖤" : "❤️"}
              </button>
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
