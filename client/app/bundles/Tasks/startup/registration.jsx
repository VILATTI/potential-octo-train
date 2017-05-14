import ReactOnRails from 'react-on-rails';

import Tasks from '../components/Tasks';
import TasksApp from './TasksApp';

import TasksStore from '../stores/TasksStore';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Tasks,
  TasksApp,
});

ReactOnRails.registerStore({
  TasksStore,
});
