/* eslint-disable react/require-default-props */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { UserRoundCheck, UserRoundCogIcon, MenuIcon } from "lucide-react";
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

  const navbarMenuButton = useRef();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const popoverToggle = () => {
    setIsMenuActive(!isMenuActive);
    if (isMenuActive) {
      setTimeout(
        () => navbarMenuButton.current.classList.remove("inactive"),
        1
      );
    }
  };

  useEffect(() => {
    navbarMenuButton.current.classList.remove("inactive");
  }, []);

  return (
    <>
      <nav className="navbar-container">
        <button
          ref={navbarMenuButton}
          className={
            isMenuActive ? "menu-button active" : "menu-button inactive"
          }
          type="button"
          popovertarget="navlinks"
          popovertargetaction="toggle"
          onClick={popoverToggle}
        >
          <MenuIcon
            size="2.625rem"
            color="#d9d9d9"
            strokeWidth={2}
            aria-label="Menu"
          />
        </button>

        {user !== null ? (
          <div>
            {user && user.role === "user" && (
              <Link to="/user">
                <UserRoundCheck size={34} color="#1fd360" strokeWidth={2} />
              </Link>
            )}

            {user && user.role === "admin" && (
              <Link to="/history9">
                <UserRoundCogIcon size={34} color="#1fd360" strokeWidth={2} />
              </Link>
            )}
          </div>
        ) : null}

        <div id="navlinks" popover="manual">
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            {user && user.role === "admin" && (
              <li>
                <Link to="/history9">Admin</Link>
              </li>
            )}
            {user && user.role === "user" && (
              <li>
                <Link to="/user">Profile</Link>
              </li>
            )}
            {user === null ? (
              <li>
                <Link to="login">Login</Link> / <Link to="signup">Signup</Link>
              </li>
            ) : (
              <li>
                <button type="button" onClick={handleLogout} className="logout">
                  Logout
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
