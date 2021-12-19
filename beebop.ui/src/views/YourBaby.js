import React from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getSingleBaby } from '../helpers/data/babyData';
import BabyCard from '../components/BabyCard';
// import { getBabies } from '../helpers/data/babyData';

function YourBaby({ user, babies }) {
  return (
    <>
      <h1 className="page-title">Your Baby</h1>
      {babies.length === 0 && <h2>No Baby Attached to Your Profile</h2>}
      <div className="baby-container">
          {babies?.filter((child) => child.userId === user.id).map((babyObj) => (
            <BabyCard key={babyObj.id}
              {...babyObj}
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
