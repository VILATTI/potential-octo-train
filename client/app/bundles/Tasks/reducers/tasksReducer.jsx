import * as actionTypes from '../constants/tasksConstants';

const initialState = {
  tasks: []
};

export default function tasksReducer(state = initialState, action) {
  const { type, taskId } = action;
  // console.log(state);
  // console.log(action);

  switch (action.type) {
    case actionTypes.CREATE_TASK:
      return action.data;

    case actionTypes.UPDATE_TASK:
      return action.data;

    case actionTypes.DELETE_TASK:
      return action.data;

    case actionTypes.RESOLVED_CREATE_TASK:
      let rctOldTasks = state.tasks;
      let newTasks = _.concat(rctOldTasks, action.data);
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
      let oldTasks = state.tasks;
      let atfsNewTasks = _.concat(oldTasks, action.data);
      return Object.assign({}, state, { tasks: atfsNewTasks });

    case actionTypes.SORT_TASKS_LIST:
      let unsortedTasks = state.tasks
      let stlNewTasks = [];
      let sortType = '';
      if(action.data.order_type == 'asc') {
        sortType = 'desc'
      } else {
        sortType = 'asc'
      }
        //   sort_type: context.toggleSortType(prevState.sort_type),
      stlNewTasks = _.orderBy(unsortedTasks, [action.data.order_by], [sortType] )
      return Object.assign({}, state, { tasks: stlNewTasks, sort_type: sortType });

    // case actionTypes.RESOLVED_SORT_TASKS_LIST:
    //   // console.log(action);
    //   console.log('!!! RESOLVED_SORT_TASKS_LIST');
    //   // return { tasks: action.data.tasks, sort_type: action.data.sort_type };
    //   return Object.assign({}, state, { tasks: action.data.tasks, sort_type: action.data.sort_type });

    default:
      return state;
  }
}
