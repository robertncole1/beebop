import React from 'react';
import {
  Button, Table
} from 'reactstrap';

export default function TaskCard({ ...taskObj }) {
  return (
    <div className="cart-table">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>{taskObj.name}</td>
            <td>{taskObj.description}</td>
            <td>{taskObj.scheduled}</td>
            <td>{taskObj.completed}</td>
            <td><Button>Update Task</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
