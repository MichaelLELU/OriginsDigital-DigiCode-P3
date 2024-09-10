import { Navigate, useLoaderData } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import { HeartIcon } from "lucide-react";

import "./UserPage.css";
import VideoList from "../../components/videolist/VideoList";
import NameUpdate from "../../components/userforms/NameUpdate";
import setPageTitle from "../../utils/setPageTitle";

export default function UserPage() {
  const currentUser = useLoaderData();
  const [videoData, setVideoData] = useState();

  const express = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${express}/api/favorites/${currentUser?.id}`).then((videos) => {
      setVideoData(videos.data);
    });
  }, [express, currentUser?.id]);

  useEffect(() => {
    setPageTitle("Profile");
  });

  return currentUser === null ? (
    <Navigate to="/login" />
  ) : (
    <>
      <div className="user-page-container">
        <section className="personal-information">
          <h1 className="title-info">{currentUser?.firstname}'s profile:</h1>
          <p className="user-details">{`Firstname: ${currentUser?.firstname}`}</p>
          <p className="user-details">{`Lastname: ${currentUser?.lastname}`}</p>
          <p className="user-details">{`Email: ${currentUser?.email}`}</p>
        </section>

        <section className="update-information">
          <h2>Update your personal information</h2>
          <NameUpdate user={currentUser} />
        </section>
      </div>

      <section className="user-favorites">
        <h2>
          Your favorite videos <HeartIcon color="red" fill="#880808" />
        </h2>
        {videoData?.length > 0 ? (
          <VideoList videoData={videoData} />
        ) : (
          <p className="no-favorites">You have no favorite videos, yet...</p>
        )}
      </section>
    </>
  );
}
