import React from 'react';
import PropTypes from 'prop-types';
import TaskForm from '../components/Forms/TaskForm';

function CreateTask({ user, setUser, babies }) {
  return (
    <>
      <div className='about-cont'>
        <TaskForm user={user} setUser={setUser} babies={babies} />
      </div>
    </>
  );
}

export default CreateTask;

CreateTask.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  babies: PropTypes.array
};
