import React, { PropTypes } from 'react';
import Task from '../components/Task';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_type: 'desc',
      tasks: props.tasksData.tasks,
      states: props.tasksData.states,
      users: props.tasksData.users,
      current_user_id: props.tasksData.current_user_id
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

  handleTasksUpdate = (data) => {
      let task = data.task;

      switch (data.action) {
        case 'add':
          return this.props.actions.addTaskFromSockets(task);
        case 'update':
          return this.props.actions.updateTaskFromSockets(task);
        case 'delete':
          return this.props.actions.deleteTaskFromSockets(data.taskId);
      }
    };

  componentDidMount() {
    this.setupSubscription();
  }

  setupSubscription () {
    App.tasks = App.cable.subscriptions.create(
      { channel: 'TasksChannel' },
      {
        performerId: this.state.current_user_id,
        handleTasksUpdate: this.handleTasksUpdate,

        connected: function () {
          setTimeout(() =>
            this.perform('subscribe', { performer_id: this.performerId }),
            1000);
        },

        received: function (data) {
          this.handleTasksUpdate(data);
        }
      }
    );
  };

  render() {
    return (
      <div>
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
              <Task key={task.id} task={task} states={this.state.states} users={this.state.users}
                    current_user_id={this.state.current_user_id}
                    onEditClick={this.props.actions.updateTaskClick}
                    onDeleteClick={(e) => this.props.actions.deleteTaskClick(task.id)}/>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}
