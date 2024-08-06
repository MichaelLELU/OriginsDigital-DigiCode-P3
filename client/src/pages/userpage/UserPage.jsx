import { useOutletContext, Navigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

import "./UserPage.css";
import VideoList from "../../components/videolist/VideoList";
import NameUpdate from "../../components/userforms/NameUpdate";

export default function UserPage() {
  const { currentUser } = useOutletContext();
  const [videoData, setVideoData] = useState();

  const express = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${express}/api/favorites/${currentUser?.id}`).then((videos) => {
      setVideoData(videos.data);
    });
  }, [express, currentUser?.id]);

  return currentUser === null ? (
    <Navigate to="/login" />
  ) : (
    <>
      <div className="user-page-container">
        <section className="personal-information">
          <h1 className="title-info">{currentUser?.firstname} Informations:</h1>
          <p className="user-details">{`Firstname: ${currentUser?.firstname}`}</p>
          <p className="user-details">{`Lastname: ${currentUser?.lastname}`}</p>
          <p className="user-details">{`Email: ${currentUser?.email}`}</p>
        </section>
        <section className="update-information">
          <h2>Update your personal informations</h2>
          <NameUpdate user={currentUser} />
        </section>
      </div>
      <section>
        <h2>Your Favorits Video</h2>
        <VideoList videoData={videoData} />
      </section>
    </>
  );
}
