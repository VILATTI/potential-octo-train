import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import EditForm from '../components/EditForm';

const Task = (props) => {
  let task = props.task;
  let onEditClick = props.onEditClick;

  return (
    <tr>
      <td> { props.task.description } </td>
      <td> { props.task.state } </td>
      <td> { props.task.owner_email } </td>
      <td> { props.task.performer_email } </td>
      <td> { new Date(props.task.created_at).toString() } </td>
      <td className="acions">
        <EditForm {...{ props, task, onEditClick }} />

        {props.task.owner_id == props.current_user_id &&
          <Button
            bsStyle="danger"
            bsSize="xs"
            onClick={props.onDeleteClick}
          >
            Delete
          </Button>
        }
      </td>
    </tr>
  )
};

export default Task;
