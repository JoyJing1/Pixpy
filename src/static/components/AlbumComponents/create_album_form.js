import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import React from 'react';

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

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <ControlLabel>Title</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="Enter a title for the album" onChange={this.handleTitleChange.bind(this)}/>
          <FormControl.Feedback/>
          <HelpBlock>Required.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Description</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="our super cool amazing roadtrip to Vermont" onChange={this.handleDescriptionChange.bind(this)}/>
          <FormControl.Feedback/>
        </FormGroup>
      </form>
    );
  }
}
