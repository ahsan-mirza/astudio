import React, { useState } from "react";
import "./SearchBar.css"; // Create a CSS file for styling
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar= ({changeHandle}:any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`search-container ${isExpanded ? "expanded" : ""}`}>
      <div className="search-icon" onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <input type="text" onChange={(e) => changeHandle(e.target.value)} className="search-input" placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
