import {useEffect, useState} from 'react'
import './App.css'
import TaskForm from "./components/TaskForm.jsx";
import CompletedTasks from "./components/CompletedTasks.jsx";
import UncompletedTasks from "./components/UncompletedTasks.jsx";
import axios from "axios";
import RefreshButton from "./components/RefreshButton.jsx";
import AuthProvider, {useAuth} from "./contexts/AuthContext.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import LogoutButton from "./components/LogoutButton.jsx";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    useEffect(() =>{
        fetchData();
    }, [])

    const fetchData = () => {
        axios.get('http://localhost:8000/api/data-list/')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.log('error fetching data', error)
            })
    }

    const deleteTask = (task) => {
        axios.delete('http://localhost:8000/api/delete-task/' + task.id + '/')
            .then(response =>{
                if (response.status === 204) {
                    fetchData()
                }
            })
            .catch(error =>{
                console.log('Error deleting task', error);
            });
    };

    const addTask = (taskText) => {
        // Send POST request to Django API to add the task
        axios.post('http://localhost:8000/api/create-task/', { text: taskText })
            .then(response => {
                // Update state with the new task
                setTasks([...tasks, response.data]);
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
        fetchData()
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
            <AuthProvider>
                <LoginForm />
                <RegisterForm />
                    <>
                        <LogoutButton />
                        <RefreshButton onClick={fetchData} />
                        <button onClick={toggleModal}>+</button>
                        {isModalOpen && (
                            <TaskForm onClose={toggleModal} onAddTask={addTask} />
                        )}
                        <UncompletedTasks
                            uncompletedTasks={uncompletedTasks}
                            onDeleteTask={deleteTask}
                            onCompleteTask={handleCompleteTask}
                        />
                        <CompletedTasks
                            completedTasks={completedTasks}
                            onDeleteTask={deleteTask}
                            onUncompleteTask={handleUnompleteTask}
                        />
                    </>
            </AuthProvider>
        </>
    );
}

export default App;
