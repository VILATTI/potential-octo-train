import React, { PropTypes } from 'react';

import TasksContainer from '../containers/TasksContainer';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      state: '',
      performer_id: props.tasksData.users[0].id,
      modalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState((prevState, props) => ({
      modalIsOpen: true
    }));
  };

  closeModal = () => {
    this.setState((prevState, props) => ({
      modalIsOpen: false
    }));
  };

  submitModal = () => {
    this.props.actions.createTaskClick(this.state);
    this.closeModal();
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleStateChange = (e) => {
    this.setState({ state: e.target.value });
  };

  handlePerformerChange = (e) => {
    this.setState({ performer_id: e.target.value });
  };

  render() {
    return (
      <div>
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={this.openModal}
        >
          Create task
        </Button>

        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                value={this.state.description}
                placeholder="Enter text"
                onChange={this.handleDescriptionChange}
              />
            </FormGroup>

            <FormGroup controlId="formStateSelect">
              <ControlLabel>State</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                value={this.state.state}
                onChange={this.handleStateChange}>
                {this.props.tasksData.states.map((state) =>
                  <option key={state} value={state}>{state}</option>)
                }
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formPerformerSelect">
              <ControlLabel>Performer</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                value={this.state.performer_id}
                onChange={this.handlePerformerChange}>
                {this.props.tasksData.users.map((user) =>
                  <option key={user.id} value={user.id}>{user.email}</option>)
                }
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.submitModal}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
};
