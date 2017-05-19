// Simple example of a React "smart" component

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateForm from '../components/CreateForm';
import Tasks from '../components/Tasks';
import * as tasksActions from '../actions/tasksActions';

const TasksContainer = ({ actions, tasksData }) => {
  return (
    <div>
      <CreateForm {...{ actions, tasksData }} />
      <Tasks {...{ actions, tasksData }} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    tasksData: state.tasksData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createTaskClick: (task) => { dispatch(tasksActions.createTask(task, dispatch)) },
      updateTaskClick: (task) => { dispatch(tasksActions.updateTask(task, dispatch)) },
      deleteTaskClick: (id)   => { dispatch(tasksActions.deleteTask(id, dispatch)); },
    }
  };
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
// export default connect(mapStateToProps, actions)(Tasks);
export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
