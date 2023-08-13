import React, {useState} from 'react';
import axios from "axios";

const  TaskForm = ({onClose , onAddTask}) => {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (taskText.trim() !== ''){
            axios.post('http://localhost:8000/api/create-task/', { text: taskText })
                .then(response => {
                    onAddTask(response.data); // Update your state with the new task data
                    setTaskText('');
                    onClose();
                })
                .catch(error => {
                    console.error('Error creating task:', error);
                });
        }
    };

  return(
      <>

      <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder={'enter task name'}
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
          />
          <button type={"submit"}>Add Task</button>
      </form>

      </>
  );
}

export default TaskForm;