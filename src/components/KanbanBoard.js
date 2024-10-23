import React, { useState, useEffect } from "react";
import { apiData } from "../apiData";
import Column from "./Column";
import GroupingMenu from "./GroupingMenu";
import SortingMenu from "./SortingMenu";
import displayIcon from "../assets/Display.svg";
import dropdownIcon from "../assets/down.svg";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem("groupBy") || "status");
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "priority");
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);

  // Save groupBy and sortBy state to localStorage when they change
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".display-container")) {
        setShowDisplayOptions(false);
      }
    };

    if (showDisplayOptions) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDisplayOptions]);

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

  const handleDisplayClick = (e) => {
    e.stopPropagation(); // Prevent the click from closing immediately
    setShowDisplayOptions(!showDisplayOptions); // Toggle dropdown on click
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the document click listener
  };

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <div className="display-container" onClick={handleDisplayClick}>
          <div className="display-container-1">
            <img src={displayIcon} alt="Display Icon" className="display-icon" />
            <div className="display-label">Display</div>
          </div>
          <div>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>
          {showDisplayOptions && (
            <div className="display-dropdown" onClick={handleDropdownClick}>
              <div className="group">
                <span>Grouping</span>
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
