import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { Button, FormControl } from 'react-bootstrap';

import './style.scss';

export default class MyModal extends Component{
  static propTypes = {
    body: React.PropTypes.string,
    photo: React.PropTypes.object,
    imageUrl: React.PropTypes.string
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
    const photo = this.props.photo;
    photo.caption = this.state.body;
    this.props.createPhoto(photo);
    ModalManager.close();
  }

  render() {
    const { imageUrl, onRequestClose } = this.props;
    return (
      <Modal className="photo-modal"
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}>

          <img className="new-photo" src={imageUrl}></img>

          <FormControl type="text"
            value={this.state.value}
            placeholder="Add a caption to your photo!"
            onChange={this.handleInputChange.bind(this)}
            onKeyDown={this.submitWithEnterKey.bind(this)}/>
      </Modal>
    );
  }
}