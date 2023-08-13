import React, {useState} from 'react';

const  TaskForm = ({onClose , onAddTask}) => {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (taskText.trim() !== ''){
            onAddTask(taskText);
            setTaskText('');
            onClose();
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