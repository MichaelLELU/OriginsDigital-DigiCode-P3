import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <>
      <h1
        style={{
          textTransform: "capitalize",
          textAlign: "center",
          margin: "3rem 0",
        }}
      >
        404 not found
      </h1>
      <span style={{ display: "block", textAlign: "center", width: "100%" }}>
        The ressource you're looking for doesn't exist !
      </span>

      <h2 style={{ textAlign: "center", margin: "3rem 0" }}>Go back to</h2>
      <ul
        className="quick-links"
        style={{
          listStyleType: "none",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          paddingLeft: 0,
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
    </>
  );
}
