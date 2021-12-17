import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import GetStartedForm from '../components/Forms/GetStartedForm';

function GetStarted({ user, setUser }) {
  return (
    <>
      <div className='about-cont'>
      <Container>
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col>
            <GetStartedForm user={user} setUser={setUser}/>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
}

export default GetStarted;

GetStarted.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
