import React from "react";

const CompletedTasks = ({ completedTasks, onDeleteTask, onUncompleteTask }) => {
  return(
    <>
      <h2>Completed tasks</h2>
      {completedTasks.map((task) => (
          <li key={task.id}>
            {task.text}
              <button onClick={() => onDeleteTask(task)}>Delete</button>
              <button onClick={() => onUncompleteTask(task)}>Uncomplete</button>
          </li>
      ))}
    </>
  );
}

export default CompletedTasks;