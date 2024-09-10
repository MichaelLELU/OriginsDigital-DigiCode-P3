import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import fetchAuth from "./utils/auth";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/images/origins-digital.svg";

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
          <h1 className="logoContainer">
            <Link to="/">
              <img loading="lazy" src={logo} alt="home" />
            </Link>
          </h1>
          <Outlet context={{ currentUser, setCurrentUser }} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
