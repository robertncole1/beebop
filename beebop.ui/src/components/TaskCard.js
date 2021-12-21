import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';
import { deleteTask, getSingleTask } from '../helpers/data/taskData';
import ModalExample from './Modal';

export default function TaskCard({
  user, setSingleTask, setdeleteTask, ...taskObj
}) {
  const [taskToEdit, setTaskToEdit] = useState({});
  const [editing, setEditing] = useState(false);

  const handleClickEdit = (type) => {
    switch (type) {
      case 'edit':
        getSingleTask(taskObj?.id).then((response) => {
          setTaskToEdit(response);
          setEditing((prevState) => !prevState);
        });
        break;
      case 'delete':
        deleteTask(taskObj.id, user)
          .then(setdeleteTask);
        break;
      default:
        console.warn('No button clicked');
    }
  };
  return (
    <div className="task-table">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>{taskObj.name}</td>
            <td>{taskObj.description}</td>
            <td>Time Scheduled: {taskObj.scheduled}</td>
            <td>Time Completed: {taskObj.completed}</td>
            <td><Button onClick={() => handleClickEdit('edit')}>Update Task</Button></td>
            {
              user.isParent === true
              && <td><Button onClick={() => handleClickEdit('delete')}>Delete Task</Button></td>
            }
          </tr>
        </tbody>
      </Table>
      {
        editing && <ModalExample
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        setSingleTask={setSingleTask}
        setEditing={setEditing}
        user={user}
        {...taskObj}
        />
      }
    </div>
  );
}

TaskCard.propTypes = {
  user: PropTypes.any,
  setSingleTask: PropTypes.func,
  setdeleteTask: PropTypes.func
};
