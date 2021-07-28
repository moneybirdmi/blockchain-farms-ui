import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";

const SearchComponent: React.FC = () => {
  return (
    <div className="search-component">
      <input
        className="form-control search"
        placeholder="Search Bird Farm pairs and tokens"
      ></input>
      <SearchIcon />
    </div>
  );
};

export default SearchComponent;
