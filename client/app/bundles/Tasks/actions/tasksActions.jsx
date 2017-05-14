import axios from 'axios';
import * as actionTypes from '../constants/tasksConstants';

export function deleteTask(taskId) {
  return (dispatch) => {
    return axios.delete('/tasks/' + taskId + '.json')
      .then(json => dispatch(resolvedDeleteTask(taskId)))
  }
}
