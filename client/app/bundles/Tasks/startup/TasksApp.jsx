import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../stores/TasksStore';
import TasksContainer from '../containers/TasksContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext

// const TasksApp = (props, _railsContext) => (
//   <Provider store={configureStore(props)}>
//     <TasksContainer />
//   </Provider>
// );
//
// export default TasksApp;


export default () => {
  // This is where we get the existing store.
  const store = ReactOnRails.getStore('TasksStore');
  return (
    <Provider store={store}>
      <TasksContainer />
    </Provider>
  );
};
