import React from "react";

const GroupingMenu = ({ setGroupBy }) => {
  return (
    <select onChange={(e) => setGroupBy(e.target.value)}>
      <option value="status">Status</option>
      <option value="user">User</option>
      <option value="priority">Priority</option>
    </select>
  );
};

export default GroupingMenu;
