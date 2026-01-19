import React, { useState } from "react";
import "./SearchBar.css";
import { useDarkModeContext } from "../store/DarkModeContext";
const SearchBar = () => {
    const {darkMode,setDarkMode} = useDarkModeContext();
  return (
    <div className="searchBar">
      <input placeholder="Search City..." />
      <div className="toggle-switch">
        <label className="switch">
          <input type="checkbox" onChange={()=>setDarkMode((prev)=>!prev)} checked={darkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
