import React, {useState} from 'react';
import axios from "axios";

const  TaskForm = ({onClose}) => {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (taskText.trim() !== ''){
            axios
                .post('http://localhost:8000/api/create-task/', {"text":taskText})
                .then(response => {
                    onClose();
                })
                .catch((error) => {
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