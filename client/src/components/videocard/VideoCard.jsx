/* eslint-disable react/require-default-props */
import { NavLink, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import "./VideoCard.css";
import { LockIcon, PlayIcon } from "lucide-react";

export default function VideoCard({ video, reload = false }) {
  const { currentUser } = useOutletContext();

  return (
    <NavLink
      className="cardContainer"
      to={`/video/${video.id}`}
      reloadDocument={reload}
    >
      <div className="overlay">
        <h2 className="cardTitle">{video.title}</h2>
      </div>
      <div className="cardImageContainer">
        {video.is_connected === 0 || currentUser != null ? (
          <>
            <img
              loading="lazy"
              className="cardImage"
              src={video.image}
              alt={video.title}
            />
            <PlayIcon
              className="poster-icon"
              stroke="#d9d9d9"
              strokeWidth={2}
            />
            <PlayIcon
              className="poster-icon poster-icon-outline"
              stroke="#3d3d3d"
              strokeWidth={2.3}
            />
          </>
        ) : (
          <>
            <img
              loading="lazy"
              className="imageNotConnected"
              src={video.image}
              alt={video.title}
            />
            <LockIcon
              className="poster-icon"
              strokeWidth={1.5}
              stroke="#d9d9d9"
            />
          </>
        )}
      </div>
    </NavLink>
  );
}

VideoCard.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    is_connected: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  reload: PropTypes.bool,
};
