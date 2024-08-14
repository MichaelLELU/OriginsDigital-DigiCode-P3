import { useOutletContext, Navigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

import "./UserPage.css";
import NameUpdate from "../../components/userforms/NameUpdate";
import UserDelete from "../../components/userforms/UserDelete";

export default function UserPage() {
  const { currentUser } = useOutletContext();
  const [user, setUser] = useState();

  const express = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${express}/api/users/${currentUser?.id}`).then((response) => {
      setUser({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
      });
    });
  }, [express, setUser, currentUser?.id]);

  return currentUser === undefined ? (
    <Navigate to="/login" />
  ) : (
    <div className="user-page-container">
      <section className="personal-information">
        <h1 className="title-info">{user?.firstname} Informations:</h1>

        <p className="user-details">{`Username: ${user?.firstname} ${user?.lastname}`}</p>
        <p className="user-details">Email: {user?.email}</p>
      </section>
      <section className="update-information">
        <h2>Update your personal informations</h2>
        <NameUpdate user={currentUser} />
      </section>
      <section className="update-information">
        <h2>Delete your account</h2>
        <UserDelete user={currentUser} />
      </section>
    </div>
  );
}
