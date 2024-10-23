import React, { useState, useEffect } from "react";

const GroupingMenu = ({ setGroupBy }) => {
  // Initialize selectedGroup from localStorage or default to "status"
  const [selectedGroup, setSelectedGroup] = useState(() => localStorage.getItem("groupBy") || "status");

  useEffect(() => {
    // Update local storage whenever selectedGroup changes
    localStorage.setItem("groupBy", selectedGroup);
  }, [selectedGroup]);

  const handleGroupChange = (e) => {
    const newGroup = e.target.value;
    setSelectedGroup(newGroup);
    setGroupBy(newGroup); // Notify parent component of the change
  };

  return (
    <select style={{width:"85px"}} value={selectedGroup} onChange={handleGroupChange}>
      <option value="status">Status</option>
      <option value="user">User</option>
      <option value="priority">Priority</option>
    </select>
  );
};

export default GroupingMenu;
