import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getSingleBaby } from '../helpers/data/babyData';
import { getBabyTask } from '../helpers/data/taskData';
import TaskCard from '../components/TaskCard';

function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [singleTask, setSingleTask] = useState();
  const [deleteTask, setdeleteTask] = useState();
  const { id } = useParams();

  useEffect(() => {
    getBabyTask(id).then((response) => setTasks(response));
  }, [singleTask, deleteTask]);

  return (
    <>
      <h1 className="page-title">Your Tasks</h1>
      <div className="task-container">
        {tasks.map((taskObj) => (
          <TaskCard key={taskObj.id}
          user={user}
          setTasks={setTasks}
          setdeleteTask={setdeleteTask}
          setSingleTask={setSingleTask}
            {...taskObj}
          />
        ))}
        {tasks.length === 0 && <h2 className="page-title">No Tasks for Your Baby</h2>}
      </div>
    </>
  );
}

export default Tasks;

Tasks.propTypes = {
  user: PropTypes.any,
  babyObj: PropTypes.array,
};
