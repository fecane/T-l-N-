import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVideoSearch } from "../context/VideoContext";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useVideoSearch(query, (search) => {
    setResults(search.slice(0, 20));
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResultClick = () => {
    setQuery("");
  };

  const videos = results.map((v) => {
    return (
      <li key={v.id}>
        <Link to={`/videos/${v.id}`} onClick={handleResultClick}>
          {v.title}
        </Link>
      </li>
    );
  });

  return (
    <React.Fragment>
      <input
        type="text"
        name="search-query"
        onChange={handleChange}
        className="search-query-field"
        placeholder="Rechercher…"
        value={query}
      />
      {results.length > 0 && (
        <div className="search-results">
          <ul>{videos}</ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default Search;
