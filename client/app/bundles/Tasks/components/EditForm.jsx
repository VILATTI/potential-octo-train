import React, { PropTypes } from 'react';

import TasksContainer from '../containers/TasksContainer';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
// import Modal from 'react-bootstrap/lib/Modal';
import Modal, {closeStyle} from 'simple-react-modal'

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.task.id,
      description: props.task.description,
      state: props.task.state,
      performer_id: props.task.performer_id,
      performer_email: props.task.performer_email,
      owner_id: props.task.owner_id,
      modalIsOpen: false,
      states: props.props.states,
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
    this.props.onEditClick(this.state);
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
          <Button bsStyle="primary" bsSize="xs" onClick={this.openModal}>Edit</Button>
        </div>

        <Modal show={this.state.modalIsOpen} onClose={this.closeModal}>
          <div>
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
                {this.state.states.map((st) =>
                  <option key={st} value={st}>{st}</option>)
                }
              </FormControl>
            </FormGroup>

            <FormGroup controlId="performer">
              <ControlLabel>Performer</ControlLabel>
              <FormControl
                disabled={true}
                type="text"
                value={this.state.performer_email}
              />
            </FormGroup>
          </div>

          <div>
            <Button bsStyle="primary" onClick={this.submitModal}>Update</Button>
          </div>
        </Modal>
      </div>
    )
  }
};
