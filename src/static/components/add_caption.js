import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import { Button } from 'react-bootstrap';

export default class MyModal extends Component{
  handleChange() {

  }

   render(){
      const { image_url, onRequestClose } = this.props;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.ScaleUp}>
            <h1>What you input : {text}</h1>
            <FormControl type="text" value={this.state.value} placeholder="Enter caption here" onChange={this.handleChange}/>
            <button onClick={ModalManager.close}>Close Modal</button>
         </Modal>
      );
   }
}

exports
