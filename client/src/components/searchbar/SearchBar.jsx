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
    const minCharacters = 3;

    if (inputValue?.length >= minCharacters) {
      navigate(`/result/${encodeURIComponent(inputValue)}`);
    } else if (!inputValue || inputValue.length < minCharacters) {
      toast.error(`Please enter at least ${minCharacters} characters`);
    }
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        id="search"
        type="search"
        placeholder="Search something..."
        onChange={(event) => setInputValue(event.target.value)}
        aria-label="Search query"
      />
      <button className="searchButton" type="submit">
        <SearchIcon aria-label="Search videos" color="#2B2929" fill="#D9D9D9" />
      </button>
    </form>
  );
}
