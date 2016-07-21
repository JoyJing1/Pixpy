import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import React from 'react';

export default class CreateAlbumForm extends React.Component{
  getInitialState() {
    return {value: ''};
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 0)
      return 'success';
    else
      return 'error';
    }


  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <ControlLabel>Title</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="Enter a title for the album" onChange={this.handleChange}/>
          <FormControl.Feedback/>
          <HelpBlock>Required.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <ControlLabel>Description</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="our super cool amazing roadtrip to Vermont" onChange={this.handleChange}/>
          <FormControl.Feedback/>
        </FormGroup>
      </form>
    );
  }
}
