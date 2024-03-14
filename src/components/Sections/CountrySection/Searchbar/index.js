import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import "./searchbar.scss";

const Searchbar = ({ query, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <form
      className="search-form"
      action=""
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${isFocused ? "input__focused" : ""}`}
      >
        <span>
          <BiSearchAlt2 className="bi-search" size={20} />
        </span>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={"Search for country..."}
          autoComplete="off"
        />
      </div>
    </form>
  );
};

export default Searchbar;
