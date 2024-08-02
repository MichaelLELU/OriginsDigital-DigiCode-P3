import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <Link to="/rgpd"> General Data Protection Regulation </Link>
      <Link to="/"> Home </Link>
    </footer>
  );
}
