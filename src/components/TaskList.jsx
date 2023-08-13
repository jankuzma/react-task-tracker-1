import React from 'react';

const TaskList = ({ tasks, onDeleteTask, onCompleteTask }) => {
    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text} - {task.completed ? 'Completed' : 'Not Completed'}
                        <button onClick={() => onDeleteTask(task)}>Delete</button>
                        <button onClick={() => onCompleteTask(task)}>Complete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;