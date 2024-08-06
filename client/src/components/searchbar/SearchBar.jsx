import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
    if (inputValue.length <= 2) {
      toast.error("Please enter at least 3 characters");
    }
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <ToastContainer role="alert" theme="colored" />
      <input
        id="search"
        type="text"
        placeholder="Search"
        onChange={(event) => setInputValue(event.target.value)}
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
