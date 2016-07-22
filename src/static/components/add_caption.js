import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

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

  // componentDidMount() {
  //   this.refs.captionInput.getDOMNode().focus();
  // }

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
    const { imageUrl, onRequestClose, style } = this.props;
    return (
      <Modal className="photo-modal"
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}>

          <img className="new-photo" src={imageUrl}></img>

          <FormGroup>
            <div className="input-wrapper clearfix">
              <FormControl type="text"
                autoFocus
                ref="captionInput"
                value={this.state.value}
                placeholder="Add a caption to your photo!"
                onChange={this.handleInputChange.bind(this)}
                onKeyDown={this.submitWithEnterKey.bind(this)}/>
              <img src="https://res.cloudinary.com/joyjing1/image/upload/v1469222782/iconmonstr-redo-1-48_1_s8ej7q.png"
                  className="return-arrow"
                  onClick={this.handleSubmit.bind(this)}/>
              </div>
          </FormGroup>
      </Modal>
    );
  }
}
