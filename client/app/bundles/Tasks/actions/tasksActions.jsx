import axios from 'axios';
import * as actionTypes from '../constants/tasksConstants';

export function createTask(task) {
  return (dispatch) => {
    return axios.post('/tasks.json', { task: task })
      .then(json => dispatch(resolvedCreateTask(json.data, dispatch)))
  }
}

export function resolvedCreateTask(data, dispatch) {
  return {
    type: actionTypes.RESOLVED_CREATE_TASK,
    data: data
  }
}

export function updateTask(task) {
  return (dispatch) => {
    return axios.put('/tasks/' + task.id + '.json', { task: task })
      .then(json => dispatch(resolvedUpdateTask(json.data, dispatch)))
  }
}

export function resolvedUpdateTask(data, dispatch) {
  return {
    type: actionTypes.RESOLVED_UPDATE_TASK,
    data: data
  }
}

export function deleteTask(taskId) {
  return (dispatch) => {
    return axios.delete('/tasks/' + taskId + '.json')
      .then(json => dispatch(resolvedDeleteTask(taskId)))
  }
}

export function resolvedDeleteTask(taskId) {
  return {
    type: actionTypes.RESOLVED_DELETE_TASK,
    taskId: taskId
  }
}
