import React, { useState, useEffect, useRef } from "react";
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

  const dropdownRef = useRef(null); // Reference for the dropdown element

  // Save groupBy state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  // Save sortBy state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  // Detect clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDisplayOptions(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent click from closing the dropdown
  };

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <div className="display-container" onClick={() => setShowDisplayOptions(!showDisplayOptions)}>
          <div className="display-container-1">
            <img src={displayIcon} alt="Display Icon" className="display-icon" />
            <div className="display-label">Display</div>
          </div>
          <div>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>
          {showDisplayOptions && (
            <div className="display-dropdown" ref={dropdownRef} onClick={handleDropdownClick}>
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
