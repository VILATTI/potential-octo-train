// Simple example of a React "smart" component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tasks from '../components/Tasks';
// import * as actions from '../actions/tasksActions';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ tasksData: state.tasksData });

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, null)(Tasks);
