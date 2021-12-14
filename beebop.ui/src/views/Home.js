import React from 'react';
import PropTypes from 'prop-types';
import HeroImage from '../components/HeroImage';

function Home() {
  return (
    <>
      <HeroImage/>
    </>
  );
}

export default Home;

Home.propTypes = {
  user: PropTypes.any
};
