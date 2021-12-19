import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Card, Button, CardTitle, CardText, CardBody
} from 'reactstrap';

function BabyCard({ ...babyObj }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/tasks');
  };

  return (
  <Card>
    <CardBody>
      <CardTitle>{babyObj.name}</CardTitle>
      <CardText>
        Age: {babyObj.age}
      </CardText>
      <Button variant="primary">Edit Your Babys Information</Button>
      <Button variant="primary" onClick={handleClick}>View Your Babys Tasks</Button>
    </CardBody>
  </Card>
  );
}
export default BabyCard;
