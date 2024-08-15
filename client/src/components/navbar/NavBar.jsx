/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  UserRoundCheckIcon,
  UserRoundCogIcon,
  UserRoundPlusIcon,
  LibraryIcon,
  HouseIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import userLogout from "../../utils/logout";
import logo from "../../assets/images/origins-digital.svg";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout()
      .then(() => setUser(null))
      .then(() => navigate("/"));
    toast.info("You are logged out!");
  };

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="navbar-container">
        {isMobile ? (
          <button
            className="menu-button"
            type="button"
            popovertarget="navlinks"
            popovertargetaction="toggle"
            onClick={toggleMenu}
          >
            <div
              aria-label="menu"
              className={`burger-menu ${isMenuOpen ? "open" : ""}`}
            >
              <span />
              <span />
              <span />
            </div>
          </button>
        ) : null}

        <div
          {...(isMobile
            ? { id: "navlinks", popover: "manual" }
            : { id: "navlinks-desktop" })}
        >
          <ul>
            <li>
              <Link to="/">
                <HouseIcon />
                {" HOME"}
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <LibraryIcon />
                {" Categories"}
              </Link>
            </li>
            {user && user.role === "admin" && (
              <li>
                <Link to="/history9">
                  <UserRoundCogIcon /> Admin
                </Link>
              </li>
            )}
            {user && user.role === "user" && (
              <li>
                <Link to="/user">
                  <UserRoundCheckIcon /> Profile
                </Link>
              </li>
            )}
            {user === null ? (
              <li>
                <Link to="login">
                  <LogInIcon />
                  {" Login"}
                </Link>
                {" or "}
                <Link to="signup">
                  <UserRoundPlusIcon />
                  {" Signup"}
                </Link>
              </li>
            ) : (
              <li>
                <button type="button" onClick={handleLogout} className="logout">
                  <LogOutIcon />
                  {" Logout"}
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="logoContainer">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
    </>
  );
}

NavBar.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
};
