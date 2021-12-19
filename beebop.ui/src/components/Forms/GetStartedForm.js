import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { getSingleUser, updateUser } from '../../helpers/data/userData';

export default function GetStartedForm({ user, setUser }) {
  const { id } = useParams();
  const [isTrue, setIsTrue] = useState(user.isParent);
  const [userObject, setUserObject] = useState({
    isParent: user?.isParent || false,
  });
  const history = useHistory();

  useEffect(() => {
    getSingleUser(id).then(setUserObject);
  }, []);

  const handleCheckBox = () => {
    setIsTrue(!isTrue);
  };

  const handleSubmit = () => {
    if (isTrue) {
      userObject.isParent = true;
      updateUser(id, userObject).then((resp) => setUser(resp.data));
      history.push('/add-baby');
    } else {
      userObject.isParent = false;
      updateUser(id, userObject).then((resp) => setUser(resp.data));
      history.push('/tasks');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Check the box below if you are a parent. If you are a caregiver, please let it unchecked.
      </Label>
        <FormGroup check>
          <Input
            type="checkbox"
            name="isParent"
            id="isParent"
            checked={isTrue}
            onChange={handleCheckBox}
          />
          <Label>
            Are you a Parent?
          </Label>
      </FormGroup>
      <Button>Next Step</Button>
    </Form>
  );
}
GetStartedForm.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};
