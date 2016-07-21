"use strict";

// const PropTypes = require('react').PropTypes
//     , React = require('react');

import { PropTypes, React } from 'react';
import dataCreatePhoto from '../../actions/photo';

import CLOUDINARY from 'cloudinary';
//
// import cloudinary;
// import cloudinary.uploader;
// import cloudinary.api;

const UploadPhotosButton = React.createClass({
    upload(e) {
        e.preventDefault(e);
        let that = this;

        cloudinary.openUploadWidget(
            window.CLOUDINARY_OPTIONS,
            function(error, images) {
                if (error === null) {
                  // console.log("Upload succeeded in upload_photos_button.jsx");
                    for (let i = 0; i < images.length; i++) {
                        const photo = { image_url: images[i].url, caption: "Need to prompt for caption (modal?)" };
                        // prompt to add a caption
                        console.log("Need to add a caption")
                        console.log(photo);
                        dataCreatePhoto(photo); // Need to pass token
                        // that.props.postImage(images[i].url);
                    }
                } else {
                    console.log("Upload failed in upload_photos_button.jsx");
                    // console.log(error);
                }
            }
      );
  },

    render() {
        return (
            <button onClick={this.upload}
                  className="add-photo-button">Upload Photos</button>
        );
    }

});

module.exports = UploadPhotosButton;
