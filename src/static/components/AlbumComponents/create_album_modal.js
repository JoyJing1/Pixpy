import { dataCreateAlbum } from '../../actions/album';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
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
      const { text,onRequestClose } = this.props;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.ScaleUp}>

            <div className="modal-header">
              <h1>Create an Album</h1>
            </div>

            <div className="modal-body">
              <CreateAlbumForm ref="createForm"/>
            </div>

            <div className="modal-footer">
              <Button bsStyle="success"onClick={this._handleSubmit.bind(this)}>
                Create
              </Button>
              <Button onClick={ModalManager.close}>
                Cancel
              </Button>
            </div>

         </Modal>
      );
   }
}
