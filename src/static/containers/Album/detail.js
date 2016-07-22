import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/photo';
// import { dataFetchPhotos, dataCreatePhoto } from '../../actions/photo';
// import { dataCreatePhoto } from '../../actions/photo';
import UploadPhotosButton from '../../components/upload_photos_button';
import CLOUDINARY_OPTIONS from '../../components/cloudinary_options';

import Masonry from 'react-masonry-component';


import './style.scss';

const masonryOptions = {
  transitionDuration: 0
};

const masonryStyle = {
  // backgroundColor: 'tomato'
  // padding: '10px'
};

class AlbumDetailView extends React.Component {

  static propTypes = {
    statusText: React.PropTypes.string,
    photos: React.PropTypes.array,
    curr_album: React.PropTypes.object
  };

  componentWillMount() {
    // console.log("containers/AlbumDetail/index.js componentWillMount - about to dataFetchPhotos");
    // const token = this.props.token;
    this.props.actions.dataFetchPhotos(this.props.token, this.props.params.id);
  }

  upload(e) {
    e.preventDefault(e);
    const album = this.props.curr_album;
    const dataCreatePhoto = this.props.actions.dataCreatePhoto;

    cloudinary.openUploadWidget(
      CLOUDINARY_OPTIONS,
      function(error, images) {
        if (error === null) {
          // console.log("Upload succeeded in upload_photos_button.jsx");
          for (let i = 0; i < images.length; i++) {
            // prompt to add a caption
            // LocalStorage
            // console.log("Need to add a caption");
            const photo = { image_url: images[i].secure_url,
                            caption: "Need to prompt for caption (modal?)",
                            album_id: album.id };
            // console.log(window.sessionStorage.token);
            // console.log(photo);
            dataCreatePhoto(window.sessionStorage.token, photo);
          }
        } else {
          // console.log("Upload failed in upload_photos_button.jsx");
          // console.log(error);
        }
      }
    );
  }

  render() {
    const childElements = this.props.photos.map( photo => {
      return (
        <li className="image-element-class"
          key={photo.id}>
          <img src={photo.image_url} />
        </li>
     );
  });

    return (
      <div className="container">
        <h2>{this.props.curr_album.title}</h2>
        <h3>{this.props.curr_album.description}</h3>

        <UploadPhotosButton album={this.props.curr_album} upload={this.upload.bind(this)}/>

        <Masonry
          className={'my-gallery-class'}
          elementType={'ul'}
          style={masonryStyle}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          >
          {childElements}
        </Masonry>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const curr_album = state.photos.curr_album ? state.photos.curr_album[0] : {};
  // debugger;
  return {
    statusText: state.auth.statusText,
    photos: state.photos.photos,
    curr_album: curr_album
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("containers/AlbumDetail/index.js mapDispatchToProps");
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailView);
