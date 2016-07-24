import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalManager } from 'react-dynamic-modal';
import { Button } from 'react-bootstrap';

import './style.scss';

export default class CreateAlbumForm extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: ''
      };
    }

  getValidationState() {
    const length = this.state.title.length;
    if (length > 0)
      return 'success';
    else
      return 'error';
    }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  changeFocusOnEnterKey(e) {
    if (e.keyCode === 13) {
      ReactDOM.findDOMNode(this.refs.descriptionInput).focus();
    }
  }

  submitWithEnterKey(e) {
    if (e.keyCode === 13) {
      this._handleSubmit();
    }
  }

  _handleSubmit(){
    this.props.createAlbum(this.props.token, this.state)
    ModalManager.close();
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText"
              validationState={this.getValidationState()}>
          <FormControl type="text"
                className="new-album-input"
                value={this.state.value}
                placeholder="Enter a title"
                autoFocus
                onChange={this.handleTitleChange.bind(this)}
                onKeyDown={this.changeFocusOnEnterKey.bind(this)}/>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <FormControl type="text"
                className="new-album-input"
                value={this.state.value}
                placeholder="Provide a description of your album"
                ref="descriptionInput"
                onChange={this.handleDescriptionChange.bind(this)}
                onKeyDown={this.submitWithEnterKey.bind(this)}/>
        </FormGroup>

        <div className="modal-footer">
          <Button bsStyle="success"
                className="create-album-button"
                onClick={this._handleSubmit.bind(this)}>
            Create
          </Button>
        </div>

      </form>
    );
  }
}
