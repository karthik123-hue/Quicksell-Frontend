import React, { useState, useEffect } from "react";

const SortingMenu = ({ setSortBy }) => {
  // Initialize selectedSort from localStorage or default to "priority"
  const [selectedSort, setSelectedSort] = useState(() => localStorage.getItem("sortBy") || "priority");

  useEffect(() => {
    // Update local storage whenever selectedSort changes
    localStorage.setItem("sortBy", selectedSort);
  }, [selectedSort]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSelectedSort(newSort);
    setSortBy(newSort); // Notify parent component of the change
  };

  return (
    <select style={{width:"85px"}} value={selectedSort} onChange={handleSortChange}>
      <option value="priority">Priority</option>
      <option value="title">Title</option>
    </select>
  );
};

export default SortingMenu;
