// import { combineReducers } from 'redux';
// // import { HELLO_WORLD_NAME_UPDATE } from '../constants/helloWorldConstants';
//
// const initialState = {
//   tasks: []
// };
//
// const tasksData = (state = initialState, action) => {
//   switch (action.type) {
//     // case HELLO_WORLD_NAME_UPDATE:
//     //   return action.text;
//     default:
//       return state;
//   }
// };
//
// const tasksReducer = combineReducers({ tasksData });
//
// export default tasksReducer;





// import * as actionTypes from '../constants/tasksConstants';

const initialState = {
  tasks: []
};

export default function TasksReducer(state = initialState, action) {
  const { type, taskId } = action;
  switch (type) {
    // case actionTypes.DELETE_TASK:
    //   return state;

    default:
      return state;
  }
}
