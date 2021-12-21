import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';
import { getSingleTask } from '../helpers/data/taskData';
import ModalExample from './Modal';

export default function TaskCard({ user, setSingleTask, ...taskObj }) {
  const [taskToEdit, setTaskToEdit] = useState({});
  const [editing, setEditing] = useState(false);

  const handleClickEdit = () => {
    getSingleTask(taskObj?.id).then((response) => {
      setTaskToEdit(response);
      setEditing((prevState) => !prevState);
    });
  };
  return (
    <div className="task-table">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>{taskObj.name}</td>
            <td>{taskObj.description}</td>
            <td>Time Scheduled: {taskObj.scheduled}</td>
            <td>Time Completed:{taskObj.completed}</td>
            <td><Button onClick={() => handleClickEdit('edit')}>Update Task</Button></td>
          </tr>
        </tbody>
      </Table>
      {
        editing && <ModalExample
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        setSingleTask={setSingleTask}
        setEditing={setEditing}
        {...taskObj}
        />
      }
    </div>
  );
}

TaskCard.propTypes = {
  user: PropTypes.any,
  setSingleTask: PropTypes.func,
};
