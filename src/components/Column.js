import React from "react";
import TaskCard from "./TaskCard";
import "./Column.css";
import addIcon from "../assets/add.svg";
import menuIcon from "../assets/3 dot menu.svg";

// Import your icons
import highPriorityIcon from "../assets/Img - High Priority.svg";
import midPriorityIcon from "../assets/Img - Medium Priority.svg";
import lowPriorityIcon from "../assets/Img - Low Priority.svg";
import urgentIcon from "../assets/SVG - Urgent Priority colour.svg"; // Example import for priority icons
import noPriorityIcon from "../assets/No-priority.svg"; // Add all necessary icons
import todoIcon from "../assets/To-do.svg"; // Example import for status icons
import doneIcon from "../assets/Done.svg";
import inprogressIcon from "../assets/in-progress.svg";
import cancelledIcon from "../assets/Cancelled.svg";
import backlogIcon from"../assets/Backlog.svg";


const Column = ({ group, tickets, sortBy ,displayState}) => {
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
  });

  // Map group to corresponding icon
  const getGroupIcon = (group) => {
    switch (group) {
      case "Urgent":
        return urgentIcon;
      case "High":
        return highPriorityIcon;
      case "Medium":
        return midPriorityIcon;
      case "Low":
        return lowPriorityIcon;
      case "NoPriority":
        return noPriorityIcon;
      case "Todo":
        return todoIcon;
      case "InProgress":
        return inprogressIcon;
      case "Done":
        return doneIcon;
      case "Backlog":
        return backlogIcon;
      case "Cancelled":
        return cancelledIcon;
      default:
        return null; // No icon for other groups

    }
  };
  const getCount =(group) =>{
    
  }
  return (
    <div className="column">
      <div className="column-header">
        {/* Render icon if available */}
        <div className="icon-div">
          {getGroupIcon(group) && <img src={getGroupIcon(group)} alt={`${group} Icon`} className="group-icon" style={{marginRight:"10px"}}/>}
          {/* Display group name with task count */}
          <h2>{group} {  tickets.length}</h2> {/* Show task count here */}
        </div>
        <div className="menu-icons">
       <img src={addIcon}  className="group-icon" style={{cursor:"pointer"}}/>
       <img src ={menuIcon} className="group-icon" style={{cursor:"pointer"}}/>
        </div>
      </div>
      {sortedTickets.map((ticket) => (
        <TaskCard key={ticket.id} ticket={ticket} displayState={displayState}/>
      ))}
    </div>
  );
};

export default Column;
