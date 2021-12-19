import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getSingleBaby } from '../helpers/data/babyData';
import { getTasks } from '../helpers/data/taskData';
import TaskCard from '../components/TaskCard';

function Tasks({ babyObj }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((response) => setTasks(response));
  }, []);

  return (
    <>
      <h1 className="cart-title">Your Babys Tasks</h1>
      {tasks.length === 0 && <h2>No Tasks for Your Baby</h2>}
      <div className="baby-container">
        {tasks?.filter((task) => task.babyId === babyObj.id).map((taskObj) => (
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
