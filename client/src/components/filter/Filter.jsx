import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Filter.css";

export default function Filter({ category }) {
  return (
    <div className="filter-wrapper">
      <h2>Categories</h2>
      <div className="filterContainer">
        {category.map((c) => (
          <Link
            to={`/categories/${c.name}`}
            className="filterButton"
            type="button"
            key={c.id}
          >
            <span className="categories-mapped-name">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

Filter.propTypes = {
  category: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
