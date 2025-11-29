import React from "react";
import "../style/Searchbox.css";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="search-box mb-4">
      <input
        type="text"
        placeholder="Search by hotel name, city, pincode, price..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
    </div>
  );
};

export default SearchBox;
