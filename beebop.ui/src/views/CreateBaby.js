import React from 'react';
import PropTypes from 'prop-types';
import BabyForm from '../components/Forms/BabyForm';

function CreateBaby({ user, setUser, setSingleBaby }) {
  return (
    <>
      <div className='about-cont'>
        <BabyForm user={user} setUser={setUser} setSingleBaby={setSingleBaby}/>
      </div>
    </>
  );
}

export default CreateBaby;

CreateBaby.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  setSingleBaby: PropTypes.func,
};
