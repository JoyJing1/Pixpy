"use strict";

import React from 'react';
import { dataCreatePhoto } from '../actions/photo';
// import * as actionCreators from '../actions/photo';
// import * as actionCreators from '../../actions/photo';
import CLOUDINARY_OPTIONS from './cloudinary_options';


class UploadPhotosButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.upload}
          className="add-photo-button">Upload Photos
      </button>
    );
  }
}


export default UploadPhotosButton;
