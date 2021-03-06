import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { Button, FormControl } from 'react-bootstrap';

import './style.scss';

export default class MyModal extends Component{
  static propTypes = {
    imageUrl: React.PropTypes.string,
    caption: React.PropTypes.string
  }

  render() {
    // const style = { content: { background: '#828282' } };
    const { imageUrl, caption, onRequestClose, style } = this.props;
    return (
      <Modal className="photo-modal"
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}>

          <div className="photo-container">
            <img className="photo-detail" src={imageUrl.replace("upload", "upload/c_scale/w_400")}></img>
          </div>
          <a className="photo-caption">{caption}</a>

      </Modal>
    );
  }
}
