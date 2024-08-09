import { Link } from "react-router-dom";
import { HomeIcon, LibraryIcon } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <hr />
      <Link to="/rgpd"> General Data Protection Regulation </Link>
      <ul>
        <li>
          <Link to="/">
            <HomeIcon size={18} /> Home
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <LibraryIcon size={18} /> Categories
          </Link>
        </li>
      </ul>
    </footer>
  );
}
