import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  useEffect(() => {
    getSingleUser(id).then(setUserObject);
  }, []);

  // const handleInputChange = (e) => {
  //   setUserObject((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.checked
  //   }));
  // };

  const handleCheckBox = () => {
    setIsTrue(!isTrue);
  };

  const handleSubmit = () => {
    if (isTrue) {
      userObject.isParent = true;
      updateUser(id, userObject).then((resp) => setUser(resp.data));
    } else {
      userObject.isParent = false;
      updateUser(id, userObject).then((resp) => setUser(resp.data));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
