// "use strict";

import React from 'react';
import { dataCreatePhoto } from '../actions/photo';
// import * as actionCreators from '../actions/photo';
// import * as actionCreators from '../../actions/photo';
import CLOUDINARY_OPTIONS from './cloudinary_options';


// debugger;

class UploadPhotosButton extends React.Component {
// const UploadPhotosButton = ({ album }) => {
    static proptypes = {
        album: React.PropTypes.object
    };

    upload(e) {
        // console.log("this.props = ");
        // console.log(this.props);
        // debugger;
        e.preventDefault(e);
        // console.log(e.target.value);
        // let that = this;
        let album = this.props.album;

        cloudinary.openUploadWidget(
            CLOUDINARY_OPTIONS,
            function(error, images) {
                if (error === null) {
                    // console.log("Upload succeeded in upload_photos_button.jsx");
                    for (let i = 0; i < images.length; i++) {
                        debugger;
                        const photo = { image_url: images[i].url, caption: "Need to prompt for caption (modal?)", album: album };
                        // prompt to add a caption
                        // LocalStorage
                        // console.log("Need to add a caption");
                        console.log(window.sessionStorage.token);
                        console.log(photo);
                        debugger;
                        dataCreatePhoto(window.sessionStorage.token, photo); // Need to pass token
                        // that.props.postImage(images[i].url);
                    }
                } else {
                    console.log("Upload failed in upload_photos_button.jsx");
                    // console.log(error);
                }
            }
      );
  }

    render() {
      // console.log("inside render");
      // console.log(this)
        return (
            <button onClick={this.upload.bind(this)}
                  className="add-photo-button"
                  >Upload Photos</button>
        );
    }

}

//
// UploadPhotosButton.propTypes = {
//   album: PropTypes.object.isRequired
// }


export default UploadPhotosButton;
