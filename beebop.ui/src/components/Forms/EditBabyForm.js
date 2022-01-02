import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Row, Label, FormGroup, Form, Input
} from 'reactstrap';
import { editBaby } from '../../helpers/data/babyData';
import { getParentOrCaregiver } from '../../helpers/data/userData';

export default function EditBabyForm({
  babyToEdit, setModal, setSingleBaby
}) {
  const [baby, setBaby] = useState({});
  const [isCaregiver, setIsCaregiver] = useState([]);

  useEffect(() => {
    setBaby({
      id: babyToEdit?.id,
      name: babyToEdit?.name,
      age: babyToEdit?.age,
      caregiverId: babyToEdit?.caregiverId,
      userId: babyToEdit?.userId,
    });
    getParentOrCaregiver(false).then((response) => setIsCaregiver(response));
  }, []);

  const handleInputChange = (e) => {
    setBaby((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBaby(babyToEdit?.id, baby).then(setSingleBaby);
    setModal(false);
  };
  return (
    <Container>
        <Row>
          <Col>
          <Form
      id='babyForm'
      autoComplete='off'
      onSubmit={handleSubmit}
      className='baby-form'>
      <Label>Enter in Your Baby&apos;s New Information</Label>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="babyName">Your Baby&apos;s Name</Label>
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
              value={baby.caregiverId}
              id="selectCaregiver">
              <option value=''>Select Caregiver</option>
              {isCaregiver.map((caregiver) => (
                <option key={caregiver.id} value={caregiver.id}>{caregiver.firstName} {caregiver.lastName}</option>
              ))};
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <Button className="primary-btn">Submit</Button>
    </Form>
          </Col>
        </Row>
      </Container>
  );
}
EditBabyForm.propTypes = {
  user: PropTypes.any,
  babyToEdit: PropTypes.any,
  setBabyToEdit: PropTypes.func,
  setEditing: PropTypes.func,
  setSingleBaby: PropTypes.func,
  setModal: PropTypes.func
};
