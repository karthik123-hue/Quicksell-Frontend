import React, { useState } from "react";
import { apiData } from "../apiData";
import Column from "./Column";
import GroupingMenu from "./GroupingMenu";
import SortingMenu from "./SortingMenu";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);

  const groupTickets = () => {
    if (groupBy === "status") {
      return {
        Todo: apiData.tickets.filter((ticket) => ticket.status === "Todo"),
        InProgress: apiData.tickets.filter((ticket) => ticket.status === "In progress"),
        Done: apiData.tickets.filter((ticket) => ticket.status === "Done"),
        Backlog: apiData.tickets.filter((ticket) => ticket.status === "Backlog"),
        Cancelled: apiData.tickets.filter((ticket) => ticket.status === "Cancelled"),
      };
    } else if (groupBy === "user") {
      return apiData.users.reduce((acc, user) => {
        acc[user.name] = apiData.tickets.filter((ticket) => ticket.userId === user.id);
        return acc;
      }, {});
    } else if (groupBy === "priority") {
      return {
        Urgent: apiData.tickets.filter((ticket) => ticket.priority === 4),
        High: apiData.tickets.filter((ticket) => ticket.priority === 3),
        Medium: apiData.tickets.filter((ticket) => ticket.priority === 2),
        Low: apiData.tickets.filter((ticket) => ticket.priority === 1),
        NoPriority: apiData.tickets.filter((ticket) => ticket.priority === 0),
      };
    }
  };

  const groupedTickets = groupTickets();
  const handleDisplayClick = () => {
    setShowDisplayOptions(!showDisplayOptions); // Toggle dropdown on click
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent click from closing the dropdown
  };

  return (
    <div className="kanban-board">
      <div className="kanban-header">
      <div className="display-container" onClick={handleDisplayClick}>
          <div className="display-label">Display</div>
          {showDisplayOptions && (
            <div className="display-dropdown" onClick={handleDropdownClick}>
              <div className="group">
              <span>Grouping </span>
              <GroupingMenu setGroupBy={setGroupBy} />
              </div>
              <div className="order">
              <span>Ordering</span>
              <SortingMenu setSortBy={setSortBy} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((group) => (
          <Column key={group} group={group} tickets={groupedTickets[group]} sortBy={sortBy} displayState={groupBy} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
