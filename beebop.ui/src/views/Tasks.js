import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getSingleBaby } from '../helpers/data/babyData';
import { getBabyTask } from '../helpers/data/taskData';
import TaskCard from '../components/TaskCard';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getBabyTask(id).then((response) => setTasks(response));
  }, []);

  return (
    <>
      <h1 className="page-title">Your Baby&apos;s Tasks</h1>
      {tasks.length === 0 && <h2>No Tasks for Your Baby</h2>}
      <div className="task-container">
        {tasks.map((taskObj) => (
          <TaskCard key={taskObj.id}
            {...taskObj}
          />
        ))}
      </div>
    </>
  );
}

export default Tasks;

Tasks.propTypes = {
  user: PropTypes.any,
  babyObj: PropTypes.array,
};
