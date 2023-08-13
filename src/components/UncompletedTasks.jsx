import React from "react";

const UncompletedTasks = ({ uncompletedTasks, onDeleteTask, onCompleteTask }) => {
  return(
    <>
      <h2>Uncompleted tasks</h2>
      {uncompletedTasks.map((task) => (
          <li key={task.id}>
            {task.text}
              <button onClick={() => onDeleteTask(task)}>Delete</button>
              <button onClick={() => onCompleteTask(task)}>Complete</button>
          </li>
      ))}
    </>
  );
}

export default UncompletedTasks;