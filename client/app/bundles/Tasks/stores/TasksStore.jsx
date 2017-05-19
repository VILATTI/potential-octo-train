// import { createStore } from 'redux';
// import tasksReducer from '../reducers/tasksReducer';
//
// const configureStore = (railsProps) => (
//   createStore(tasksReducer, railsProps)
// );
//
// export default configureStore;



import { combineReducers, applyMiddleware, createStore } from 'redux';
import middleware from 'redux-thunk';

import reducers from '../reducers/reducersIndex';

/*
 *  Export a function that takes the props and returns a Redux store
 *  This is used so that 2 components can have the same store.
 */
export default (props, railsContext) => {
  const combinedReducer = combineReducers(reducers);
  props.railsContext = railsContext;
  return applyMiddleware(middleware)(createStore)(combinedReducer, props);
};
