import { useState } from 'react'
import './App.css'
import TaskForm from "./components/TaskForm.jsx";
import CompletedTasks from "./components/CompletedTasks.jsx";
import UncompletedTasks from "./components/UncompletedTasks.jsx";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    const addTask = (taskText) => {
        const newTask = {id: tasks.length + 1, text: taskText, completed:false}
        setTasks([...tasks, newTask])
    };

    const handleDeleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
        setTasks(updatedTasks);
    };

    const handleCompleteTask = (taskToComplete) => {
        const updatedTasks = tasks.map((task) =>
        task.id === taskToComplete.id ? {...task, completed: true} : task
        );
        setTasks(updatedTasks)
    }

    const handleUnompleteTask = (taskToUncomplete) => {
        const updatedTasks = tasks.map((task) =>
        task.id === taskToUncomplete.id ? {...task, completed: false}: task
        );
        setTasks(updatedTasks)
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

  return (
    <>
        <button onClick={toggleModal}>+</button>
        {isModalOpen && (
            <TaskForm
                onClose={toggleModal}
                onAddTask={addTask}
            />
        )}
        <UncompletedTasks
            uncompletedTasks={uncompletedTasks}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask} />
        <CompletedTasks
            completedTasks={completedTasks}
            onDeleteTask={handleDeleteTask}
            onUncompleteTask={handleUnompleteTask} />
    </>
  )
}

export default App
