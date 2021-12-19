import React from 'react';
import PropTypes from 'prop-types';
import BabyForm from '../components/Forms/BabyForm';

function CreateBaby({ user, setUser }) {
  return (
    <>
      <div className='about-cont'>
        <BabyForm user={user} setUser={setUser}/>
      </div>
    </>
  );
}

export default CreateBaby;

CreateBaby.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
