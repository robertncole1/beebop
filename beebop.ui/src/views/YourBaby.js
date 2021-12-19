import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getSingleBaby } from '../helpers/data/babyData';
import { getTasks } from '../helpers/data/taskData';
import BabyCard from '../components/BabyCard';
import TaskCard from '../components/TaskCard';
import { getBabies } from '../helpers/data/babyData';

function YourBaby({ user }) {
  const [baby, setBaby] = useState([]);
  const [tasks, setTasks] = useState([]);
  // const { id } = useParams();

  useEffect(() => {
    getBabies().then((response) => setBaby(response));
  }, []);

  useEffect(() => {
    getTasks().then((response) => setTasks(response));
  }, []);

  const babies = baby.map((child) => child.userId === user.id);

  return (
    <>
      <h1 className="cart-title">Your Baby</h1>
      {baby.length === 0 && <h2>No Baby Attached to Your Profile</h2>}
      <div className="baby-container">
        {baby?.filter((child) => child.userId === user.id).map((babyObj) => (
          <BabyCard key={babyObj.id}
            {...babyObj}
          />
        ))}
      </div>
      <h1 className="cart-title">Your Babys Tasks</h1>
      {tasks.length === 0 && <h2>No Tasks for Your Baby</h2>}
      <div className="baby-container">
        {tasks?.filter((task) => task.babyId === babies.id).map((taskObj) => (
          <TaskCard key={taskObj.id}
            {...taskObj}
          />
        ))}
      </div>
    </>
  );
}

export default YourBaby;

YourBaby.propTypes = {
  user: PropTypes.any,
  babies: PropTypes.array,
  setBabies: PropTypes.func
};
