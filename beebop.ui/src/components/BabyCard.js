import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  Card, Button, CardTitle, CardText, CardBody
} from 'reactstrap';
import { getSingleBaby } from '../helpers/data/babyData';
import ModalExample from './Modal';

function BabyCard({
  user, setBabies, setSingleBaby, ...babyObj
}) {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [babyToEdit, setBabyToEdit] = useState({});

  const handleClickEdit = () => {
    getSingleBaby(babyObj?.id).then((response) => {
      setBabyToEdit(response);
      setEditing((prevState) => !prevState);
    });
  };

  const handleClick = () => {
    history.push(`/tasks/${babyObj.id}`);
  };

  return (
  <Card>
    <CardBody>
      <CardTitle>{babyObj.name}</CardTitle>
      <CardText>
        Age: {babyObj.age}
      </CardText>
      {
        user.isParent === true
        && <Button variant="primary" onClick={() => handleClickEdit('edit')}>Edit Your Baby&apos;s Information</Button>
      }
      <Button variant="primary" onClick={() => handleClick()}>View Your Baby&apos;s Tasks</Button>
      {
        editing && <ModalExample
        babyToEdit={babyToEdit}
        setBabyToEdit={setBabyToEdit}
        setEditing={setEditing}
        setSingleBaby={setSingleBaby}
        setBabies={setBabies}
        {...babyObj}
        />
      }
    </CardBody>
  </Card>
  );
}
export default BabyCard;
BabyCard.propTypes = {
  user: PropTypes.any,
  setBabies: PropTypes.func,
  setSingleBaby: PropTypes.func
};
