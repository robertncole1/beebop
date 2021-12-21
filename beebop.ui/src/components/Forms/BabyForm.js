import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBaby(baby).then((response) => {
      setBaby(response);
    });
    history.push('/create-task');
    setVisible(true);
    window.location.reload();
  };

  return (
    <Container>
        <Row>
          <Col>
          <h2>How to Get Started</h2>
            <p>Use the checkbox to select whether you are a parent or caregiver.</p>
            <p className='bold-text'>IMPORTANT: Caregivers must sign up first in order for the parent to assign their child to a caregiver!</p>
            <p>If you are a parent, the next step for you is to input your baby&apos;s information to the system. From there, you can assign a caregiver to your baby from a dropdown list.</p>
            <p>If you are a caregiver, once the mother assigns their child to you and creates tasks, you can see that informmation within your profile.</p>
          </Col>
          <Col>
          <h2>Input Your Baby&apos;s Information</h2>
          <Form
      id='babyForm'
      autoComplete='off'
      onSubmit={handleSubmit}
      className='baby-form'>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="babyName">Your Babys Name</Label>
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
      <Button>Add Baby</Button>
    </Form>
          </Col>
        </Row>
      </Container>
  );
}
BabyForm.propTypes = {
  user: PropTypes.any,
  setSingleBaby: PropTypes.func
};
