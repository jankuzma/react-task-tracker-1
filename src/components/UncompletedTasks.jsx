import React from "react";

const CompletedTasks = ({ completedTasks }) => {
  return(
    <>
      <h2>Completed tasks</h2>
      {completedTasks.map((task) => (
          <li key={task.id}>
            {task.text}

          </li>
      ))}
    </>
  );
}

export default CompletedTasks;