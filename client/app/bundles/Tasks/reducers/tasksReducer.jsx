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
      console.log(state);
      console.log(action);
      var newTasks = _.concat(state.tasks, action.data);
      console.log(newTasks);
      return Object.assign({}, state, { tasks: newTasks });

    case actionTypes.RESOLVED_DELETE_TASK:
      console.log(state);
      console.log(action);
      var tasks = state.tasks
      var removedTasks = _.remove(tasks, { id: action.taskId });
      console.log(tasks);
      return Object.assign({}, state, { tasks: tasks });

    case actionTypes.RESOLVED_UPDATE_TASK:
      console.log(state);
      console.log(action);
      var tasks = state.tasks
      var index = _.findIndex(tasks, { id: action.data.id });
      console.log(index);
      var newTasks = state.tasks.splice(index, 1, action.data);
      console.log(newTasks);
      console.log(tasks);
      return Object.assign({}, state, { tasks: tasks });

    case actionTypes.ADD_TASK_FROM_SOCKETS:
      console.log(state);
      console.log(action);
      var newTasks = _.concat(state.tasks, action.data);
      console.log(newTasks);
      return Object.assign({}, state, { tasks: newTasks });

    default:
      return state;
  }
}
