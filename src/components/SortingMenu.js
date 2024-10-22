import React from "react";

const SortingMenu = ({ setSortBy }) => {
  return (
    <select onChange={(e) => setSortBy(e.target.value)}>
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  );
};

export default SortingMenu;
