import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { Button, FormControl } from 'react-bootstrap';

export default class MyModal extends Component{
  static propTypes = {
    body: React.PropTypes.string,
    photo: React.PropTypes.object,
    image_url: React.PropTypes.string
    // createPhoto: React.PropTypes.function,
    // onRequestClose: React.PropTypes.function
  }

  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      body: e.currentTarget.value
    });
  }

  submitWithEnterKey(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    // Return value of body
    let photo = this.props.photo;
    photo.caption = this.state.body;
    // debugger;
    this.props.createPhoto(photo);
    ModalManager.close();
  }

  render() {
    const { image_url, onRequestClose } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}>
        <h1>THIS IS MY CAPTION MODAL</h1>
          <img src={image_url}></img>
          <FormControl type="text"
            value={this.state.value}
            placeholder="Enter caption here"
            onChange={this.handleInputChange.bind(this)}
            onKeyDown={this.submitWithEnterKey.bind(this)}/>

          <button onClick={this.handleSubmit.bind(this)}>Add Caption</button>
      </Modal>
    );
  }
}
