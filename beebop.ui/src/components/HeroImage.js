import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Button
} from 'reactstrap';
import { signInUser } from '../helpers/auth';

export default function HeroImage({ user, setUser }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/get-started/${user?.id}`);
  };

  return (
    <div className="hero-image">
    <Container>
      <Row>
        <Col>
        </Col>
        <Col>
          <div className="hero-text">
            <h2>Built for Babies and Busy Bees!</h2>
          </div>
          {
            // eslint-disable-next-line no-nested-ternary
            user
              ? <Button className="primary-btn" onClick={() => handleClick()}>Get Started</Button>
              : <Button className="primary-btn" onClick={() => signInUser(setUser)}>Sign In to Get Started</Button>
                }
        </Col>
      </Row>
    </Container>
  </div>
  );
}
HeroImage.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
