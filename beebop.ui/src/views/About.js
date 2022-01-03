import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Row
} from 'reactstrap';
import { signInUser } from '../helpers/auth';

function About({ user, setUser }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/get-started/${user?.id}`);
  };

  return (
    <>
      <div className='about-cont'>
      <Container>
        <Row>
          <Col>
          <img
            src="https://user-images.githubusercontent.com/76854545/147959864-b5da59eb-6e83-4400-a10f-1f32732f464b.png"
            width="600"
            alt="beebop about us"
          />
          </Col>
          <Col>
            <h2>About Us</h2>
            <p>Beebop started as a conversation between my mother, who is a full-time nanny and my sister who is expecting her first child. They both stress the importance of the parent/caregiver relationship and how that can shape the development of the child. Beebop takes that relationship very seriously. We are a scheduling app designed to keep your baby on track no matter who is taking care of them. We got you covered.</p>
            <p>Family is at the heart of everything we do and we take child development very seriously. So, beebop allows you to see how your child is being cared for on a daily basis. As a parent, you can create tasks and activites for your child and caregiver to do together! As a caregiver, you can stay on task and keep track of everything you have acomplished today. We know how challenging child care can be. Beebop is here to help!</p>
          </Col>
        </Row>
      </Container>
      </div>
      <div className='about-cta'>
        <div className="hero-text">
          <h2>Time to get your baby on track!</h2>
        </div>
        {
            // eslint-disable-next-line no-nested-ternary
            user
              ? <Button className='cta-btn' onClick={() => handleClick()}>Get Started</Button>
              : <Button className="cta-btn" onClick={() => signInUser(setUser)}>Sign In to Get Started</Button>
        }
      </div>
    </>
  );
}

export default About;

About.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
