import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Card, Button, CardTitle, CardText, CardBody
} from 'reactstrap';

function BabyCard({ ...babyObj }) {
  const history = useHistory();
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
      <Button variant="primary">Edit Your Baby&apos;s Information</Button>
      <Button variant="primary" onClick={() => handleClick()}>View Your Baby&apos;s Tasks</Button>
    </CardBody>
  </Card>
  );
}
export default BabyCard;
