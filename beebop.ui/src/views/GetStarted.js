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
          <h2>How to Get Started</h2>
            <p>Use the checkbox to select whether you are a parent or caregiver.</p>
            <p>IMPORTANT: Caregivers must sign up first in order for the parent to assign their child to a caregiver!</p>
            <p>If you are a parent, the next step for you is to input your baby&apos;s information to the system. From there, you can assign a caregiver to your baby from a dropdown list. As a caregiver, once the mother assigns their child to you and creates tasks, you can see that informmation within your profile.</p>
            <p>If you are a caregiver, once the mother assigns their child to you and creates tasks, you can see that informmation within your profile.</p>
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
