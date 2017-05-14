import React, { PropTypes } from 'react';
import Task from '../components/Task';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_type: 'desc',
      tasks: props.tasksData.tasks
    };
  }

  toggleSortType = (prevSortType) => {
    if(prevSortType == 'asc') {
      return 'desc'
    } else {
      return 'asc'
    }
  }

  sort = (field, context) => {
    return function(e) {
      e.preventDefault();
      context.setState((prevState, props) => ({
        sort_type: context.toggleSortType(prevState.sort_type),
        tasks: _.orderBy(props.tasksData.tasks, [field], [prevState.sort_type] )
      }));
    }
  };

  render() {
    return (
      <table className="table table-stripped tasks-list-table">
        <thead>
          <tr>
            <th onClick={this.sort('description', this)}><a className="sorted" href="#">Description</a></th>
            <th onClick={this.sort('state', this)}><a className="sorted" href="#">State</a></th>
            <th onClick={this.sort('owner_email', this)}><a className="sorted" href="#">Owner</a></th>
            <th onClick={this.sort('performer_email', this)}><a className="sorted" href="#">Performer</a></th>
            <th onClick={this.sort('created_at', this)}><a className="sorted" href="#">Created at</a></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tasks.map((task) =>
            <Task key={task.id} task={task}/>)
          }
        </tbody>
      </table>
    );
  }
}
