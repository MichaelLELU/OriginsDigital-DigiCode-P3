import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchIcon } from "lucide-react";

import "./SearchBar.css";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length > 2) {
      navigate(`/result/${encodeURIComponent(inputValue)}`);
    }
    if (!inputValue || inputValue.length <= 2) {
      toast.error("Please enter at least 3 characters");
    }
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        id="search"
        type="search"
        placeholder="Search"
        onChange={(event) => setInputValue(event.target.value)}
        aria-label="search input"
      />
      <button
        className="searchButton"
        type="submit"
        style={{ display: "flex", alignItems: "center" }}
      >
        <SearchIcon aria-label="Search" />
      </button>
    </form>
  );
}
