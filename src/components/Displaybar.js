import React from "react";

const GroupingMenu = ({ setGroupBy }) => {
  return (
    <select onChange={(e) => setGroupBy(e.target.value)}>
      <option value="status">Group by Status</option>
      <option value="user">Group by User</option>
      <option value="priority">Group by Priority</option>
    </select>
  );
};


const SortingMenu = ({ setSortBy }) => {
  return (
    <select onChange={(e) => setSortBy(e.target.value)}>
      <option value="priority">Sort by Priority</option>
      <option value="title">Sort by Title</option>
    </select>
  );
};

export default SortingMenu;
