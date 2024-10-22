import React from "react";
import "./TaskCard.css";
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

const TaskCard = ({ ticket , displayState }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return urgentIcon;
      case 3:
        return highPriorityIcon;
      case 2:
        return midPriorityIcon;         
      case 1:
        return lowPriorityIcon;
      default:
        return noPriorityIcon; // Default if no priority
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return todoIcon;
      case "In progress":
        return inprogressIcon;
      case "Done":
        return doneIcon;
      case "Backlog":
        return backlogIcon;
      case "Cancelled":
        return cancelledIcon;
      default:
        return null;
    }
  };

  return (
    <div className="task-card">
    <div className="task-card-header">
      <div style={{display:"flex" , alignItems:"center", justifyContent:"space-between"}}>
      <h3 style={{margin:"0px"}}>{ticket.id}</h3>
      {displayState !== "user" && (
        <img src={todoIcon} alt="User Icon" className="user-icon" />
      )}
      </div>
    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
      {displayState !== "status" && (
        <img src={getStatusIcon(ticket.status)} alt="status Icon" style={{marginRight:"10px"}} />
      )}
      <h3 style={{margin:"0px"}}>{ticket.title}</h3>
      </div>
      {/* Show user icon if displayState is not 'user' */}
      
    </div>

    {/* Show priority icon if displayState is not 'priority' */}
    <div style={{display:"flex" , alignItems:"center" , justifyContent:"flex-start"}}>
    {displayState != "priority" && (
      <div className="priority">
        <img src={getPriorityIcon(ticket.priority)} alt="Priority Icon" />
      </div>
    )}

    <div className="status">
      <p style={{margin:"0px"}}>{ticket.tag}</p>
    </div>
    </div>
  </div>
);
};

export default TaskCard;

