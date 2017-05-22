import React, { PropTypes } from 'react';

import TasksContainer from '../containers/TasksContainer';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
// import Modal from 'react-bootstrap/lib/Modal';
import Modal, {closeStyle} from 'simple-react-modal'


export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      state: '',
      performer_id: props.users[0].id,
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
        <div>
          <Button
            bsStyle="success"
            bsSize="small"
            onClick={this.openModal}
            data-toggle="modal"
          >
            Create task
          </Button>
        </div>

        <Modal show={this.state.modalIsOpen} onClose={this.closeModal}>
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
              {this.props.states.map((state) =>
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
              {this.props.users.map((user) =>
                <option key={user.id} value={user.id}>{user.email}</option>)
              }
            </FormControl>
          </FormGroup>

          <div>
            <Button bsStyle="primary" onClick={this.submitModal}>Create</Button>
          </div>
        </Modal>
      </div>
    )
  }
};
