import { Link } from "react-router-dom";
import { CookieIcon } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <Link to="/rgpd">
        <CookieIcon size={18} />
        {" General Data Protection Regulation"}
      </Link>
    </footer>
  );
}
