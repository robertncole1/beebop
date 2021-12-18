import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, FormGroup, Label, Input, Button, Container,
} from 'reactstrap';
import { getParentOrCaregiver } from '../../helpers/data/userData';
import { createBaby } from '../../helpers/data/babyData';

export default function BabyForm() {
  const [caregivers, setCaregivers] = useState([]);
  const [baby, setBaby] = useState({
    caregiverId: '',
    name: '',
    age: '',
  });

  useEffect(() => {
    getParentOrCaregiver(false).then((response) => setCaregivers(response));
  }, []);

  const handleInputChange = (e) => {
    setBaby((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'caregiverId' ? e.target.selected : e.target.value
    }));
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [visible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBaby(baby).then((response) => {
      setBaby(response);
    });
    setVisible(true);
  };

  return (
    <Container>
        <Row>
          <Col>
            <h2>Add Your Baby to beebop</h2>
            <p>Type in the information to add in your babys information and assign them to a caregiver in our system. You will then be able to add tasks for the caregiver.</p>
          </Col>
          <Col>
          <Form
      id='babyForm'
      autoComplete='off'
      onSubmit={handleSubmit}
      className='baby-form'>
      <Label>Enter in Your Babys Information</Label>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="robotTitle">Your Babys Name</Label>
            <Input
              type="text"
              name="name"
              id="babyName"
              placeholder="Name"
              value={baby.name}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="price">Age</Label>
            <Input
              type="text"
              name="age"
              id="age"
              value={baby.age}
              onChange={handleInputChange}
              placeholder="Age"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
        <FormGroup>
        <Label for="caregiver">Caregiver</Label>
            <Input
              type="select"
              name="caregiverId"
              onChange={handleInputChange}
              id="selectCaregiver">
              <option value="">Select Caregiver</option>
              {caregivers.map((caregiver) => (
                <option key={caregiver.id} value={caregiver.id}>{caregiver.firstName} {caregiver.lastName}</option>
              ))};
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <Button>Add Robot</Button>
    </Form>
          </Col>
        </Row>
      </Container>
  );
}
BabyForm.propTypes = {
  user: PropTypes.any,
};
