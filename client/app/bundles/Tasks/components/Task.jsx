import React, { PropTypes } from 'react';

const Task = (props) => {
  return (
    <tr>
      <td> { props.task.description } </td>
      <td> { props.task.state } </td>
      <td> { props.task.owner_email } </td>
      <td> { props.task.performer_email } </td>
      <td> { new Date(props.task.created_at).toString() } </td>
      <td></td>
    </tr>
  )
};

export default Task;
