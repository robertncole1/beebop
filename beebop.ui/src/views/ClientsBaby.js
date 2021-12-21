import React from 'react';
import PropTypes from 'prop-types';
import BabyCard from '../components/BabyCard';

function ClientsBaby({ user, babies }) {
  return (
    <>
      <h1 className="page-title">Your Client&apos;s Baby</h1>
      <div className="baby-container">
        {babies?.filter((child) => child.caregiverId === user.id).map((babyObj) => (
          <BabyCard key={babyObj.id}
            user={user}
            {...babyObj}
          />
        ))}
        {babies.length === 0 && <h2 className="page-title">No Baby Attached to Your Profile</h2>}
      </div>
    </>
  );
}

export default ClientsBaby;

ClientsBaby.propTypes = {
  user: PropTypes.any,
  babies: PropTypes.array,
  setBabies: PropTypes.func
};
