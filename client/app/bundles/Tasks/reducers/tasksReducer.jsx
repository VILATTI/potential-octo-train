import * as actionTypes from '../constants/tasksConstants';

const initialState = {
  tasks: []
};

export default function tasksReducer(state = initialState, action) {
  const { type, taskId } = action;

  switch (type) {
    case actionTypes.CREATE_TASK:
      return action.data;

    case actionTypes.UPDATE_TASK:
      return action.data;

    case actionTypes.DELETE_TASK:
      return action.data;

    case actionTypes.RESOLVED_CREATE_TASK:
      let newTasks = _.concat(state.tasks, action.data);
      return Object.assign({}, state, { tasks: newTasks });

    case actionTypes.RESOLVED_DELETE_TASK:
      let rdtTasks = state.tasks
      let removedTasks = _.remove(rdtTasks, { id: action.taskId });
      return Object.assign({}, state, { tasks: rdtTasks });

    case actionTypes.RESOLVED_UPDATE_TASK:
      let rutTasks = state.tasks
      let index = _.findIndex(rutTasks, { id: action.data.id });
      let rutNewTasks = state.tasks.splice(index, 1, action.data);
      return Object.assign({}, state, { tasks: rutTasks });

    case actionTypes.ADD_TASK_FROM_SOCKETS:
      let atfsNewTasks = _.concat(state.tasks, action.data);
      return Object.assign({}, state, { tasks: atfsNewTasks });

    default:
      return state;
  }
}
