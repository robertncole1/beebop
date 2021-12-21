import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Row, Label, FormGroup, Form, Input
} from 'reactstrap';
import { editTask } from '../../helpers/data/taskData';

export default function EditTaskForm({
  taskToEdit, setModal, setSingleTask
}) {
  const [task, setTask] = useState({});

  useEffect(() => {
    setTask({
      id: taskToEdit?.id,
      name: taskToEdit?.name,
      description: taskToEdit?.description,
      scheduled: taskToEdit?.scheduled,
      completed: taskToEdit?.completed,
      babyId: taskToEdit?.babyId,
    });
  }, []);

  const handleInputChange = (e) => {
    setTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(taskToEdit?.id, task).then(setSingleTask);
    setModal(false);
  };
  return (
    <Container>
    <Row>
        <Col>
        <h2>Update a Task for Your Baby</h2>
        <Form
          id='babyForm'
          autoComplete='off'
          onSubmit={handleSubmit}
          className='baby-form'>
          <Label>Enter in New Task Info for Your Baby</Label>
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
      <Col md={6}>
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
      <Col md={6}>
      <FormGroup>
          <Label for="completed">Completed</Label>
          <Input
            type="time"
            name="completed"
            id="completed"
            value={task.completed}
            onChange={handleInputChange}
            placeholder="Time Completed"
          />
        </FormGroup>
      </Col>
    </Row>
    <Button>Update Task</Button>
  </Form>
        </Col>
      </Row>
    </Container>
  );
}
EditTaskForm.propTypes = {
  babies: PropTypes.array,
  singleTask: PropTypes.array,
  user: PropTypes.any,
  setSingleTask: PropTypes.func,
  taskToEdit: PropTypes.any,
  setEditing: PropTypes.func,
  setModal: PropTypes.func
};
