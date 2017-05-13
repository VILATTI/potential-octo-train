import React, { PropTypes } from 'react';
import Task from '../components/Task';

export default class Tasks extends React.Component {
  // static propTypes = {
  //   tasksData: PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      sort_type: 'desc',
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
      // console.log(field);
      // console.log(context.state.tasks);
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
            <th onClick={this.sort('description', this)}><span>Description</span></th>
            <th onClick={this.sort('state', this)}><span>State</span></th>
            <th onClick={this.sort('owner_email', this)}><span>Owner</span></th>
            <th onClick={this.sort('performer_email', this)}><span>Performer</span></th>
            <th onClick={this.sort('created_at', this)}><span>Created at</span></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasksData.tasks.map((task) =>
            <Task key={task.id} task={task}/>)
          }
        </tbody>
      </table>
    );
  }
}
