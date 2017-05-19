import * as actionTypes from '../constants/tasksConstants';

const initialState = {
  tasks: []
};

export default function tasksReducer(state = initialState, action) {
  const { type, taskId } = action;

  switch (type) {
    case actionTypes.CREATE_TASK:
      return action.data;

    case actionTypes.RESOLVED_CREATE_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.concat(action.data.task)
      });

    case actionTypes.DELETE_TASK:
      return state;

    case actionTypes.RESOLVED_DELETE_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.filter(function(el){return el.id != action.taskId})
      });

    case actionTypes.UPDATE_TASK:
      return action.data;

    case actionTypes.RESOLVED_UPDATE_TASK:
      var task = state.tasks.find(function(el){return el.id === action.data.id});
      task = Object.assign({}, task, action.data);
      var newTasks = state.tasks;
      for(var i=0 ; i < newTasks.length; i++)
        {
          if(newTasks[i].id == task.id)
            newTasks[i] = task
        }

      return Object.assign({}, state, {
        tasks: newTasks
      });

    default:
      return state;
  }
}
