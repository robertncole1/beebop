import React from 'react';
import {
  Container, Row, Col
} from 'reactstrap';

export default function HeroImage() {
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
        </Col>
      </Row>
    </Container>
  </div>
  );
}
