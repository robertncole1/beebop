/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody
} from 'reactstrap';
import EditBabyForm from './Forms/EditBabyForm';

const ModalExample = ({ babyToEdit, setBabyToEdit, setEditing }) => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <EditBabyForm babyToEdit={babyToEdit} setBabyToEdit={setBabyToEdit} setEditing={setEditing} setModal={setModal}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

ModalExample.propTypes = {
  babyToEdit: PropTypes.any,
  setBabyToEdit: PropTypes.func,
  setEditing: PropTypes.func
};

export default ModalExample;
