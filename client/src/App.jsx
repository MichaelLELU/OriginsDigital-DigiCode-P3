import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import fetchAuth from "./utils/auth";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchAuth().then((response) => setCurrentUser(response));
  }, []);

  return (
    <>
      <ToastContainer
        role="alert"
        theme="colored"
        autoClose={3500}
        limit={2}
        hideProgressBar
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        transition:Slide
      />
      <div className="app-container">
        <NavBar user={currentUser} setUser={setCurrentUser} />
        <main>
          <Outlet context={{ currentUser, setCurrentUser }} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
