import {
  useLoaderData,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useEffect } from "react";
import "./VideoPage.css";
import { HistoryIcon } from "lucide-react";
import CategoriesList from "../../components/categorieslist/CategoriesList";

export default function VideoPage() {
  const videoData = useLoaderData();
  const { currentUser } = useOutletContext();

  const Navigate = useNavigate();

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
