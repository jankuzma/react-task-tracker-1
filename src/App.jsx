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
    const {user} = useAuth()

    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    useEffect(() => {
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
            .then(response => {
                if (response.status === 204) {
                    fetchData()
                }
            })
            .catch(error => {
                console.log('Error deleting task', error);
            });
    };

    const handleCompleteTask = (task) => {
        axios
            .put(`http://localhost:8000/api/complete-task/${task.id}/`)
            .then(response =>{
                console.log('Task marked as completed:', response);
                if (response.status === 200){
                    fetchData()
                }
            })
            .catch(error =>{
                console.error('Error while completing the task', error)
            });
    };

    const handleUncompleteTask = (task) => {
        axios
            .put(`http://localhost:8000/api/uncomplete-task/${task.id}/`)
            .then(response =>{
                console.log('Task marked as uncompleted:', response);
                if (response.status === 200){
                    fetchData()
                }
            })
            .catch(error =>{
                console.error('Error while uncompleting the task', error)
            });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <>
            {user ? (
                    <>
                        <LogoutButton/>
                        <RefreshButton onClick={fetchData}/>
                        <button onClick={toggleModal}>+</button>
                        {isModalOpen && (
                            <TaskForm onClose={() => {
                                toggleModal()
                                fetchData()
                            }}/>
                        )}
                        <UncompletedTasks
                            uncompletedTasks={uncompletedTasks}
                            onDeleteTask={deleteTask}
                            onCompleteTask={handleCompleteTask}/>
                        <CompletedTasks
                            completedTasks={completedTasks}
                            onDeleteTask={deleteTask}
                            onUncompleteTask={handleUncompleteTask}
                        />
                    </>
                )
                : (
                    <>
                        <LoginForm/>

                        <RegisterForm/>
                    </>
                )}
        </>
    );
}

export default App;
