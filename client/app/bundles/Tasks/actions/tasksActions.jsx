import axios from 'axios';
import * as actionTypes from '../constants/tasksConstants';

export function createTask(task) {
  return (dispatch) => {
    return axios.post('/tasks.json', { task: task })
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
  }
}

export function resolvedUpdateTask(data) {
  return {
    type: actionTypes.RESOLVED_UPDATE_TASK,
    data: data
  }
}

export function deleteTask(taskId) {
  return (dispatch) => {
    return axios.delete('/tasks/' + taskId + '.json')
  }
}

export function resolvedDeleteTask(taskId) {
  return {
    type: actionTypes.RESOLVED_DELETE_TASK,
    taskId: taskId
  }
}

export function addTaskFromSockets(data) {
  return {
    type: actionTypes.ADD_TASK_FROM_SOCKETS,
    data: data
  };
}

export function sortTasksList(data) {
  return {
    type: actionTypes.SORT_TASKS_LIST,
    data: data
  };
}

export function resolvedSortTasksList(data, dispatch) {
  return {
    type: actionTypes.RESOLVED_SORT_TASKS_LIST,
    data: data
  }
}
