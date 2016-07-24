import { dataCreateAlbum } from '../../actions/album';
import { Modal, ModalManager, Effect} from 'react-dynamic-modal';
import CreateAlbumForm from './create_album_form';
import { Button } from 'react-bootstrap';
import React from 'react';

import './style.scss';

export default class CreateAlbumModal extends React.Component {
   _handleSubmit(){
     const album = this.refs.createForm.state;
     this.props.createAlbum(this.props.token, album)
     ModalManager.close();
   }
   render(){
      const { text, onRequestClose, style, token, createAlbum } = this.props;
      return (
         <Modal
            onRequestClose={onRequestClose}
            style={style}
            effect={Effect.ScaleUp}>

            <div className="modal-header">
              <h1>New Album</h1>
            </div>

            <div className="modal-body">
              <CreateAlbumForm ref="createForm" token={token} createAlbum={createAlbum}/>
            </div>



         </Modal>
      );
   }
}
