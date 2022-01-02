import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Form, Row, Col, FormGroup, Label, Input, Button, Container,
} from 'reactstrap';
import { createTask } from '../../helpers/data/taskData';

export default function TaskForm({ user, babies }) {
  const [task, setTask] = useState({
    babyId: '',
    name: '',
    description: '',
    scheduled: '',
    completed: '',
  });

  const handleInputChange = (e) => {
    setTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'babyId' ? e.target.selected : e.target.value
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
    createTask(task).then((response) => {
      setTask(response);
    });
    history.push('/baby');
    setVisible(true);
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
          <h2>Create a Task for Your Baby</h2>
          <Form
            id='babyForm'
            autoComplete='off'
            onSubmit={handleSubmit}
            className='baby-form'>
            <Label>Enter in a Task for Your Baby</Label>
      <Row form>
        <Col>
          <FormGroup>
            <Label for="name">Task Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Task Name"
              value={task.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col>
        <FormGroup>
            <Label for="scheduled">Scheduled</Label>
            <Input
              type="time"
              name="scheduled"
              id="scheduled"
              value={task.scheduled}
              onChange={handleInputChange}
              placeholder="Scheduled"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
        <FormGroup>
        <Label for="baby">Chose which child gets this task</Label>
            <Input
              type="select"
              name="babyId"
              onChange={handleInputChange}
              id="selectbaby">
              <option value="">Select Baby</option>
              {babies?.filter((child) => child.userId === user.id).map((baby) => (
                <option key={baby.id} value={baby.id}>{baby.name}</option>
              ))};
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <Button className="primary-btn">Add Task</Button>
    </Form>
          </Col>
        </Row>
      </Container>
  );
}
TaskForm.propTypes = {
  user: PropTypes.any,
  babies: PropTypes.array
};
