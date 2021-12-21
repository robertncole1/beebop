/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody
} from 'reactstrap';
import EditBabyForm from './Forms/EditBabyForm';
import EditTaskForm from './Forms/EditTask';

const ModalExample = ({
  user, babyToEdit, setBabyToEdit, setEditing, setSingleBaby, setBabies, taskToEdit, setTaskToEdit, singleTask, setSingleTask, ...babyObj
}) => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          {
            babyToEdit
            && <EditBabyForm babyToEdit={babyToEdit} setBabyToEdit={setBabyToEdit} setEditing={setEditing} setModal={setModal} setBabies={setBabies} setSingleBaby={setSingleBaby} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit}{...babyObj} />
          }
          {
            taskToEdit
            && <EditTaskForm user={user} babyToEdit={babyToEdit} setBabyToEdit={setBabyToEdit} setEditing={setEditing} setModal={setModal} setBabies={setBabies} setSingleBaby={setSingleBaby} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} setSingleTask={setSingleTask} singleTask={singleTask} {...babyObj} />
          }
        </ModalBody>
      </Modal>
    </div>
  );
};

ModalExample.propTypes = {
  user: PropTypes.any,
  singleTask: PropTypes.array,
  babyToEdit: PropTypes.any,
  setBabies: PropTypes.func,
  setBabyToEdit: PropTypes.func,
  setSingleBaby: PropTypes.func,
  setSingleTask: PropTypes.func,
  setEditing: PropTypes.func,
  taskToEdit: PropTypes.any,
  setTaskToEdit: PropTypes.func
};

export default ModalExample;
