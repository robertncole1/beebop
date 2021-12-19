import React from 'react';
import PropTypes from 'prop-types';
import HeroImage from '../components/HeroImage';

function Home({ user }) {
  return (
    <>
      <HeroImage user={user} />
    </>
  );
}

export default Home;

Home.propTypes = {
  user: PropTypes.any
};
